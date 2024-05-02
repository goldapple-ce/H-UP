package com.a702.hup.domain.documents.redis;

import com.a702.hup.application.data.request.DocumentsSaveRequest;
import com.a702.hup.application.data.response.DocumentsMembersResponse;
import com.a702.hup.application.data.response.DocumentsResponse;
import com.a702.hup.domain.documents.DocumentException;
import com.a702.hup.application.data.dto.DocumentsMemberInfo;
import com.a702.hup.domain.documents.mongodb.DocumentsMongoService;
import com.a702.hup.domain.documents.redis.entity.ActiveDocumentsMembersRedis;
import com.a702.hup.domain.documents.redis.entity.DocumentsRedis;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DocumentsRedisService {
    private final ActiveDocumentsMembersRedisRepository activeDocumentsMembersRedisRepository;
    private final DocumentsRedisRepository documentsRedisRepository;
    private final DocumentsMongoService documentsMongoService;

    private boolean isRunning = false;
    private long lastStartTime = System.currentTimeMillis();

    /**
     * @author 손현조
     * @date 2024-04-29
     * @description 5초마다 문서 상태를 Redis 저장
     **/
    public DocumentsResponse saveDocument(DocumentsSaveRequest request) {
        long now = System.currentTimeMillis();
        if (isRunning || now - lastStartTime < 5000) {
            return createResponse(request);
        }

        isRunning = true;
        lastStartTime = now;

        try {
            processDocument(request);
        } finally {
            isRunning = false;
        }

        return createResponse(request);
    }

    /**
     * @author 손현조
     * @date 2024-04-29
     * @description 문서 업데이트
     **/
    private void processDocument(DocumentsSaveRequest request) {
        DocumentsRedis documentsRedis = findOrCreateDocumentsRedis(
                Integer.toString(request.getDocumentsId()), Integer.toString(request.getMemberId()));
        documentsRedis.updateContent(request.getContent());

        documentsRedisRepository.save(documentsRedis);
    }

    /**
     * @author 손현조
     * @date 2024-04-29
     * @description 문서가 없다면, 생성
     **/
    private DocumentsRedis findOrCreateDocumentsRedis(String documentsId, String senderId) {
        return documentsRedisRepository.findById(documentsId)
                .orElseGet(() -> new DocumentsRedis(documentsId, senderId));
    }

    private DocumentsResponse createResponse(DocumentsSaveRequest request) {
        return DocumentsResponse.from(request);
    }

    /**
     * @author 손현조
     * @date 2024-04-28
     * @description 문서를 사용중인 멤버 추가, 현재 사용중인 멤버들 정보 (Id, 이름, 이미지 url) 반환
     **/
    public DocumentsMembersResponse saveMember(String documentsId, DocumentsMemberInfo memberDto){
        ActiveDocumentsMembersRedis activeDocumentsMembersRedis = activeDocumentsMembersRedisRepository.findById(documentsId)
                .orElseGet(() -> new ActiveDocumentsMembersRedis(documentsId));
        activeDocumentsMembersRedis.addMember(memberDto);
        return DocumentsMembersResponse.from(activeDocumentsMembersRedisRepository.save(activeDocumentsMembersRedis));
    }

    /**
     * @author 손현조
     * @date 2024-04-28
     * @description
     *      - 문서를 사용중인 멤버 제거, 현재 사용중인 멤버들 정보 (Id, 이름, 이미지 url) 반환
     *      - 문서를 사용중인 마지막 멤버가 연결을 종료하면, 문서 내용 영구 저장
     **/
    public DocumentsMembersResponse removeMember(String documentsId, DocumentsMemberInfo memberDto) {
        ActiveDocumentsMembersRedis activeDocumentsMembersRedis = activeDocumentsMembersRedisRepository.findById(documentsId)
                .orElseThrow(() -> new DocumentException(ErrorCode.API_ERROR_ACTIVE_DOCUMENT_MEMBER_NOT_FOUND));

        activeDocumentsMembersRedis.removeMember(memberDto);
        if (activeDocumentsMembersRedis.isDocumentMemberEmpty()) {
            documentsMongoService.save(documentsId, getLatestContent(documentsId));
        }
        return DocumentsMembersResponse.from(activeDocumentsMembersRedisRepository.save(activeDocumentsMembersRedis));
    }

    /**
     * @author 손현조
     * @date 2024-04-30
     * @description 최근 문서 내용 Redis 에서 가져오기
     **/
    private String getLatestContent(String documentsId) {
        return findDocumentRedisById(documentsId).getContent();
    }

    /**
     * @author 손현조
     * @date 2024-04-30
     * @description Redis 에서 문서 조회
     **/
    public DocumentsRedis findDocumentRedisById(String documentsId) {
        return documentsRedisRepository.findById(documentsId).orElseThrow(
                () -> new DocumentException(ErrorCode.API_ERROR_DOCUMENT_NOT_FOUND)
        );
    }


}

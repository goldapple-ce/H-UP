package com.a702.hup.domain.documents.redis;

import com.a702.hup.application.data.dto.DocumentsMemberInfo;
import com.a702.hup.application.data.dto.MessageChunkInfo;
import com.a702.hup.application.data.response.DocumentsMembersResponse;
import com.a702.hup.application.data.response.DocumentsResponse;
import com.a702.hup.domain.documents.DocumentException;
import com.a702.hup.domain.documents.mongodb.DocumentsMongoService;
import com.a702.hup.domain.documents.redis.entity.ActiveDocumentsMembersRedis;
import com.a702.hup.domain.documents.redis.entity.DocumentsRedis;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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
     * @description 0.1초마다 문서 상태를 Redis 저장
     **/
    public DocumentsResponse saveDocument(Integer documentsId, Integer memberId, MessageChunkInfo info) {
        long now = System.currentTimeMillis();
        if (isRunning || now - lastStartTime < 100) {
            return DocumentsResponse.from(info);
        }

        isRunning = true;
        lastStartTime = now;

        try {
            processDocument(documentsId, memberId, info);
        } finally {
            isRunning = false;
        }

        return DocumentsResponse.from(info);
    }

    /**
     * @author 손현조
     * @date 2024-04-29
     * @description 문서 업데이트
     **/
    private void processDocument(Integer documentsId, Integer memberId, MessageChunkInfo info) {
        DocumentsRedis documentsRedis = findOrCreateDocumentsRedis(
                Integer.toString(documentsId), memberId);
        documentsRedis.updateInfo(info);

        documentsRedisRepository.save(documentsRedis);
    }

    /**
     * @author 손현조
     * @date 2024-04-29
     * @description 문서가 없다면, 생성
     **/
    private DocumentsRedis findOrCreateDocumentsRedis(String documentsId, Integer senderId) {
        return documentsRedisRepository.findById(documentsId)
                .orElseGet(() -> DocumentsRedis.builder()
                        .documentsId(documentsId)
                        .memberId(senderId)
                        .infoList(initChunkInfoList())
                        .build());
    }

     /**
      * @author 손현조
      * @date 2024-05-13
      * @description 저장된 메시지 청크들로부터 메시지를 조합하여 반환
      **/
    public String getDocumentsContent(DocumentsRedis documentsRedis) {
        if (documentsRedis.getInfoList().get(0).getContent().equals("")) return "[]";

        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (MessageChunkInfo info : documentsRedis.getInfoList()) {
            String s = info.getContent();
            sb.append(s, 1, s.length() - 1).append(",");
        }
        sb.deleteCharAt(sb.length() - 1);
        sb.append("]");
        log.info(sb.toString());

        return sb.toString();
    }

    /**
     * @author 손현조
     * @date 2024-05-13
     * @description 메시지 청크 초기화
     **/
    public MessageChunkInfo initChunkInfo() {
        return MessageChunkInfo.builder()
                .chunkNum(0)
                .totalChunks(1)
                .messageId(0L)
                .content("").build();
    }

    /**
     * @author 손현조
     * @date 2024-05-13
     * @description 메시지 청크 리스트 초기화
     **/
    public List<MessageChunkInfo> initChunkInfoList() {
        List<MessageChunkInfo> infoList = new ArrayList<>();
        infoList.add(initChunkInfo());
        return infoList;
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
     *      - 문서를 사용중인 마지막 멤버가 연결을 종료하면, 문서 내용 (메지지 청크 리스트) 영구 저장
     **/
    public DocumentsMembersResponse removeMember(String documentsId, DocumentsMemberInfo memberDto) {
        ActiveDocumentsMembersRedis activeDocumentsMembersRedis = activeDocumentsMembersRedisRepository.findById(documentsId)
                .orElseThrow(() -> new DocumentException(ErrorCode.API_ERROR_ACTIVE_DOCUMENT_MEMBER_NOT_FOUND));

        activeDocumentsMembersRedis.removeMember(memberDto);
        if (activeDocumentsMembersRedis.isDocumentMemberEmpty()) {
            documentsMongoService.save(documentsId, getLatestMessageChunkInfoList(documentsId));
        }
        return DocumentsMembersResponse.from(activeDocumentsMembersRedisRepository.save(activeDocumentsMembersRedis));
    }

    /**
     * @author 손현조
     * @date 2024-04-30
     * @description 최근 문서 내용 (메지지 청크 리스트) Redis 에서 가져오기
     **/
    private List<MessageChunkInfo> getLatestMessageChunkInfoList(String documentsId) {
        return findDocumentRedisById(documentsId).getInfoList();
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

package com.a702.hup.domain.document.redis;

import com.a702.hup.application.data.response.DocumentsMembersResponse;
import com.a702.hup.domain.document.DocumentException;
import com.a702.hup.application.data.dto.DocumentsMemberInfo;
import com.a702.hup.domain.document.redis.entity.ActiveDocumentsMembersRedis;
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

    /**
     * @author 손현조
     * @date 2024-04-28
     * @description 문서를 사용중인 멤버 추가, 현재 사용중인 멤버들 정보 (Id, 이름, 이미지 url) 반환
     **/
    public DocumentsMembersResponse saveMember(String documentId, DocumentsMemberInfo memberDto){
        ActiveDocumentsMembersRedis activeDocumentsMembersRedis = activeDocumentsMembersRedisRepository.findById(documentId)
                .orElseGet(() -> new ActiveDocumentsMembersRedis(documentId));
        activeDocumentsMembersRedis.addMember(memberDto);
        return DocumentsMembersResponse.from(activeDocumentsMembersRedisRepository.save(activeDocumentsMembersRedis));
    }

    /**
     * @author 손현조
     * @date 2024-04-28
     * @description 문서를 사용중인 멤버 제거, 현재 사용중인 멤버들 정보 (Id, 이름, 이미지 url) 반환
     **/
    public DocumentsMembersResponse removeMember(String documentId, DocumentsMemberInfo memberDto) {
        ActiveDocumentsMembersRedis activeDocumentsMembersRedis = activeDocumentsMembersRedisRepository.findById(documentId)
                .orElseThrow(() -> new DocumentException(ErrorCode.API_ERROR_DOCUMENT_NOT_FOUND));

        activeDocumentsMembersRedis.removeMember(memberDto);
        return DocumentsMembersResponse.from(activeDocumentsMembersRedisRepository.save(activeDocumentsMembersRedis));
    }

}

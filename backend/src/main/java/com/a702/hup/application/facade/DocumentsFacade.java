package com.a702.hup.application.facade;

import com.a702.hup.application.data.dto.DocumentsMemberInfo;
import com.a702.hup.application.data.request.DocumentsMemberUpdateRequest;
import com.a702.hup.application.data.response.DocumentsMembersResponse;
import com.a702.hup.domain.documents.redis.DocumentsRedisService;
import com.a702.hup.domain.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DocumentsFacade {
    private final DocumentsRedisService documentsRedisService;
    private final MemberService memberService;

    /**
     * @author 손현조
     * @date 2024-04-29
     * @description 문서의 사용중인 멤버 추가
     **/
    public DocumentsMembersResponse saveDocumentMember(DocumentsMemberUpdateRequest request) {
        DocumentsMemberInfo documentsMemberInfo = DocumentsMemberInfo.from((memberService.findById(request.getMemberId())));
        return documentsRedisService.saveMember(Integer.toString(request.getDocumentsId()), documentsMemberInfo);
    }

    /**
     * @author 손현조
     * @date 2024-04-29
     * @description 문서의 사용중인 멤버 제거
     **/
    public DocumentsMembersResponse removeDocumentMember(DocumentsMemberUpdateRequest request) {
        DocumentsMemberInfo documentsMemberInfo = DocumentsMemberInfo.from(memberService.findById(request.getMemberId()));
        return documentsRedisService.removeMember(Integer.toString(request.getDocumentsId()), documentsMemberInfo);
    }
}

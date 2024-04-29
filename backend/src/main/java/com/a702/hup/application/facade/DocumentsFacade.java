package com.a702.hup.application.facade;

import com.a702.hup.application.data.request.SaveDocumentsMemberRequest;
import com.a702.hup.application.data.response.DocumentsMembersResponse;
import com.a702.hup.domain.document.redis.DocumentsRedisService;
import com.a702.hup.application.data.dto.DocumentsMemberInfo;
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

    public DocumentsMembersResponse saveDocumentMember(SaveDocumentsMemberRequest request) {
        DocumentsMemberInfo documentsMemberInfo = DocumentsMemberInfo.from((memberService.findById(request.getMemberId())));
        return documentsRedisService.saveMember(request.getDocumentId(), documentsMemberInfo);
    }

    public DocumentsMembersResponse removeDocumentMember(SaveDocumentsMemberRequest request) {
        DocumentsMemberInfo documentsMemberInfo = DocumentsMemberInfo.from(memberService.findById(request.getMemberId()));
        return documentsRedisService.removeMember(request.getDocumentId(), documentsMemberInfo);
    }
}

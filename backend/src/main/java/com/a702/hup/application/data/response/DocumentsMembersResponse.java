package com.a702.hup.application.data.response;

import com.a702.hup.application.data.dto.DocumentsMemberInfo;
import com.a702.hup.domain.documents.redis.entity.ActiveDocumentsMembersRedis;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Set;

@Getter
@Builder
@AllArgsConstructor
public class DocumentsMembersResponse {
    private Integer documentsId;
    private Set<DocumentsMemberInfo> documentsMemberInfoSet;

    public static DocumentsMembersResponse from(ActiveDocumentsMembersRedis activeDocumentsMembersRedis) {
        return DocumentsMembersResponse.builder()
                .documentsId(Integer.parseInt(activeDocumentsMembersRedis.getDocumentsId()))
                .documentsMemberInfoSet(activeDocumentsMembersRedis.getMemberInfoSet())
                .build();
    }
}

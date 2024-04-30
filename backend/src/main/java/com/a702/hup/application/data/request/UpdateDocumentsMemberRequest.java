package com.a702.hup.application.data.request;

import lombok.Getter;

@Getter
public class UpdateDocumentsMemberRequest {
    private String documentId;
    private Integer memberId;
}

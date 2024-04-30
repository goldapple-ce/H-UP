package com.a702.hup.application.data.request;

import lombok.Getter;

@Getter
public class SaveDocumentsRequest {
    private Integer documentId;
    private Integer senderId;
    private String content;
}

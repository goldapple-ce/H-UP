package com.a702.hup.application.data.request;

import lombok.Getter;

@Getter
public class DocumentsSaveRequest {
    private Integer documentsId;
    private Integer memberId;
    private String content;
}

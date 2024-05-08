package com.a702.hup.application.data.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class DocumentsResponse {
    private String content;

    public static DocumentsResponse from(String content) {
        return DocumentsResponse.builder().content(content).build();
    }
}

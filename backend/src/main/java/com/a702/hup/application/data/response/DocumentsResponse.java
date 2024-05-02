package com.a702.hup.application.data.response;

import com.a702.hup.application.data.request.DocumentsSaveRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class DocumentsResponse {
    private String content;

    public static DocumentsResponse from(DocumentsSaveRequest request) {
        return DocumentsResponse.builder().content(request.getContent()).build();
    }
}

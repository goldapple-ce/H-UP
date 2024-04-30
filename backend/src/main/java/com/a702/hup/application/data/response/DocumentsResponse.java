package com.a702.hup.application.data.response;

import com.a702.hup.application.data.request.SaveDocumentsRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class DocumentsResponse {
    private String content;

    public static DocumentsResponse from(SaveDocumentsRequest request) {
        return DocumentsResponse.builder().content(request.getContent()).build();
    }
}

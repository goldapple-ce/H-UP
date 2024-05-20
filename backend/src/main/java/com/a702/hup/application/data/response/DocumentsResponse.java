package com.a702.hup.application.data.response;

import com.a702.hup.application.data.dto.MessageChunkInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class DocumentsResponse {
    private Integer chunkNum;       // 메시지 청크 순서

    private Integer totalChunks;     // 메시지 청크 총 갯수

    private Long messageId;         // 메시지 구분용 id

    private String content;         // 메시지 청크 내용

    public static DocumentsResponse from(MessageChunkInfo info) {
        return DocumentsResponse.builder()
                .chunkNum(info.getChunkNum())
                .totalChunks(info.getTotalChunks())
                .messageId(info.getMessageId())
                .content(info.getContent()).build();
    }
}

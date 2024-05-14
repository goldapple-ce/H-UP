package com.a702.hup.application.data.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageChunkInfo {
    private Integer chunkNum;       // 메시지 청크 순서

    private Integer totalChunks;     // 메시지 청크 총 갯수

    private Long messageId;         // 메시지 구분용 id

    private String content;         // 메시지 청크 내용
}

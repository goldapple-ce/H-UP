package com.a702.hup.application.data.request;

import com.a702.hup.application.data.dto.MessageChunkInfo;
import lombok.Getter;

@Getter
public class DocumentsSaveRequest {
    private Integer documentsId;                // 문서 id = 이슈 id

    private Integer memberId;                   // 메시지 전송 멤버 id

    private MessageChunkInfo messageChunkInfo;  // 메시지 청크 : 메시지를 크기에 따라 나눈 단위
}

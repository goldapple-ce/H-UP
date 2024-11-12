package com.a702.hup.domain.notification.entity;

import com.a702.hup.application.data.response.NotificationResponse;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.notification.NotificationException;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import static com.a702.hup.global.error.ErrorCode.API_ERROR_INTERNAL_SERVER_ERROR;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class NotificationSSE {
    private String id;
    private Member receiver;
    private SseEmitter sseEmitter;

    public NotificationSSE(Member receiver){
        this.receiver = receiver;
    }

    public void setSseEmitter(@NotNull SseEmitter sseEmitter){
        if(this.sseEmitter != null){
            throw new NotificationException(API_ERROR_INTERNAL_SERVER_ERROR);
        }
        this.sseEmitter = sseEmitter;
    }

    public void setId(@NotNull String id){
        this.id = id;
    }

}


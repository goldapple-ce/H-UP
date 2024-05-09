package com.a702.hup.domain.notification.entity;

import com.a702.hup.application.data.response.NotificationResponse;
import com.a702.hup.domain.member.entity.Member;
import lombok.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class NotificationSSE {
    @Setter
    private String id;
    private Member member;
    private SseEmitter sseEmitter;
    private Object data;

    public NotificationSSE(Member member,SseEmitter sseEmitter,NotificationResponse data){
        this(null,member,sseEmitter,data);
    }

    public NotificationSSE(Member member,SseEmitter sseEmitter,String data){
        this(null,member,sseEmitter,data);
    }

    public void setData(Object object){
        if(object.getClass() == Notification.class){
            this.data = NotificationResponse.from((Notification) object);
        }else if(object.getClass() == String.class){
            this.data = (String)object;
        }
    }

}

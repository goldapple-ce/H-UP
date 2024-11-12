package com.a702.hup.application.data.response;

import com.a702.hup.domain.notification.entity.Notification;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Schema(description = "알림 Dto")
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class NotificationResponse {
    private String content;
    private String url;
    private LocalDateTime createdAt;

    public static NotificationResponse from (Notification notification) {
        return new NotificationResponse(notification.getContent(), notification.getUrl(), notification.getCreateAt());
    }

}
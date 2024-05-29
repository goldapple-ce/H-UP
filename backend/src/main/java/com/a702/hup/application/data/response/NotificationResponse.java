package com.a702.hup.application.data.response;

import com.a702.hup.domain.notification.entity.Notification;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Schema(description = "알림 Dto")
@Getter
@AllArgsConstructor
public class NotificationResponse {
    private int id;
    private String content;
    private String url;
    private LocalDateTime createdAt;

    public static NotificationResponse from (Notification notification) {
        return new NotificationResponse(notification.getId(), notification.getContent(), notification.getUrl(), notification.getCreateAt());
    }

}
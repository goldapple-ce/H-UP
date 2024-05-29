package com.a702.hup.application.contorller;

import com.a702.hup.domain.notification.NotificationService;
import com.a702.hup.global.config.security.SecurityUserDetailsDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/notification")
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping(produces = "text/event-stream")
    public ResponseEntity<SseEmitter> subscribe(@AuthenticationPrincipal(errorOnInvalidType = true) SecurityUserDetailsDto user, @RequestHeader(value="Last-Event-ID", required = false, defaultValue = "") String lastEventId ) {
        SseEmitter response = notificationService.subscribe(user.memberId(), lastEventId);
        return ResponseEntity.ok(response);
    }
}

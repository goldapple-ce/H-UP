package com.a702.hup.domain.notification;

import com.a702.hup.application.data.response.NotificationResponse;
import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.notification.entity.Notification;
import com.a702.hup.domain.notification.entity.NotificationSSE;
import com.a702.hup.domain.notification.entity.NotificationType;
import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationSSERepository notificationSSERepository;
    private final MemberService memberService;

    public SseEmitter subscribe(int memberId, String lastEventId) {
        log.info("start subscribe, memberId ={}, lastEventId = {}", memberId, lastEventId);
        Member member = memberService.findById(memberId);
        NotificationSSE notificationSSE = notificationSSERepository.save(new NotificationSSE(member));

        this.sendToClient(notificationSSE.getSseEmitter(), makeTimeIncludeId(member.getId()), "EventStream Created. [userName=" + member.getName() + "]");

        if (!lastEventId.isEmpty()) {
            List<Notification> notificationList = notificationRepository.findAllByReceiverAndCreateAtAfter(member,this.getCreateAt(lastEventId));
            notificationList.forEach(notification ->
                    this.sendToClient(notificationSSE, notification));
        }
        return notificationSSE.getSseEmitter();
    }

    /**
     * @author 강용민
     * @date 2024-05-08
     * @description 데이터를 클라이언트에게 보냄.
     */
    public void send(int receiverId, @NotNull NotificationType type, @NotNull String content,@NotNull String url) {
        Member receiver = memberService.findById(receiverId);
        Notification notification = notificationRepository.save(Notification.builder()
                .receiver(receiver)
                .type(type)
                .content(content)
                .url(url).build());

        List<NotificationSSE> notificationSSEs = notificationSSERepository.findAllByMember(receiver);
        for(NotificationSSE notificationSSE : notificationSSEs){
            this.sendToClient(notificationSSE, notification);
        }
    }

    protected LocalDateTime getCreateAt(String eventId){
        return LocalDateTime.ofInstant(Instant.ofEpochMilli(Long.parseLong(eventId.split("_")[1])), ZoneOffset.UTC);
    }

    public void sendToClient(NotificationSSE notificationSSE, Notification notification){
        this.sendToClient(notificationSSE.getSseEmitter(),makeTimeIncludeId(notification),NotificationResponse.from(notification));
    }

    public void sendToClient(SseEmitter emitter, String id, Object data) {
        log.info("start sendToClient : send {} to {}", data, emitter);
        try {
            emitter.send(SseEmitter.event()
                    .id(id)
                    .name("SSE")
                    .data(data));
        } catch (IOException ignored) {}
    }

    protected String makeTimeIncludeId(Notification notification){
        return notification.getReceiver().getId() + "_" + notification.getCreateAt().toInstant(ZoneOffset.UTC).toEpochMilli();
    }

    protected String makeTimeIncludeId(int id){
        return id + "_" + Instant.now().toEpochMilli();
    }
}

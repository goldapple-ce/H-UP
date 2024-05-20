package com.a702.hup.domain.notification;

import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.notification.entity.Notification;
import com.a702.hup.domain.notification.entity.NotificationSSE;
import com.a702.hup.domain.notification.entity.NotificationType;
import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class NotificationService {
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private final NotificationRepository notificationRepository;
    private final NotificationSSERepository notificationSSERepository;
    private final MemberService memberService;

    public SseEmitter subscribe(int memberId, String lastEventId) {
        log.info("start subscribe, memberId ={}, lastEventId = {}", memberId, lastEventId);
        Member member = memberService.findById(memberId);
        NotificationSSE notificationSSE = createEmitter(member);
        this.sendToClient(notificationSSE);

        if (!lastEventId.isEmpty()) {
            List<NotificationSSE> notificationSSEList = notificationSSERepository.findAllByMember(member);
            notificationSSEList.stream()
                    .filter(event -> lastEventId.compareTo(event.getId()) < 0)
                    .forEach(this::sendToClient);
        }

        return notificationSSE.getSseEmitter();
    }

    /**
     * @author 강용민
     * @date 2024-05-08
     * @description SSE Emitter를 생성
     */
    private NotificationSSE createEmitter(Member member) {
        return notificationSSERepository.save(new NotificationSSE(member, new SseEmitter(DEFAULT_TIMEOUT), "EventStream Created. [memberId=" + member.getId() + "]"));
    }

    /**
     * @author 강용민
     * @date 2024-05-08
     * @description 데이터를 클라이언트에게 보냄.
     */
    @Async
    public void send(Member receiver, NotificationType type, String content, String url) {
        String eventId = notificationSSERepository.makeTimeIncludeId(receiver.getId());
        Notification notification = notificationRepository.save(Notification.builder()
                .member(receiver)
                .type(type)
                .content(content)
                .url(url).build());

        List<NotificationSSE> notificationSSEList = notificationSSERepository.findAllByMember(receiver);
        for (NotificationSSE notificationSSE : notificationSSEList) {
            notificationSSERepository.saveEventCache(notificationSSE, notification);
            sendToClient(notificationSSE, eventId);
        }
    }

    private void sendToClient(NotificationSSE notificationSSE, String eventId) {
        log.info("start sendToClient : send {} to {}", notificationSSE.getData(), notificationSSE.getMember().getId());
        try {
            notificationSSE.getSseEmitter().send(SseEmitter.event()
                    .id(eventId)
                    .name("SSE")
                    .data(notificationSSE.getData()));
        } catch (IOException exception) {
            notificationSSERepository.deleteById(notificationSSE.getId());
            throw new BusinessException(ErrorCode.API_ERROR_INTERNAL_SERVER_ERROR);
        }
    }

    private void sendToClient(NotificationSSE notificationSSE) {
        log.info("start sendToClient : send {} to {}", notificationSSE.getData(), notificationSSE.getMember().getId());
        try {
            notificationSSE.getSseEmitter().send(SseEmitter.event()
                    .id(String.valueOf(notificationSSE.getId()))
                    .name("SSE")
                    .data(notificationSSE.getData()));
        } catch (IOException exception) {
            notificationSSERepository.deleteById(notificationSSE.getId());
            throw new BusinessException(ErrorCode.API_ERROR_INTERNAL_SERVER_ERROR);
        }
    }
}

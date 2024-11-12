package com.a702.hup.domain.notification;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.notification.entity.Notification;
import com.a702.hup.domain.notification.entity.NotificationSSE;
import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.lang.reflect.Field;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
@Slf4j
class NotificationSSERepository {
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private static final Long DEFAULT_TIMEOUT = 1000L * 60 * 60;

    public NotificationSSE save(NotificationSSE notificationSSE) {
        String id = makeTimeIncludeId(notificationSSE.getReceiver().getId());
        notificationSSE.setId(id);
        SseEmitter sseEmitter = new SseEmitter(DEFAULT_TIMEOUT);

        sseEmitter.onCompletion(() -> {
            log.info("SseEmitter for client {} completed", notificationSSE.getId());
            this.delete(id);
        });

        sseEmitter.onError((ex)->{
            log.info("SseEmitter for client {} error",notificationSSE.getId());
            sseEmitter.complete();
        });

        sseEmitter.onTimeout(() -> {
            log.info("SseEmitter for client {} timed out", notificationSSE.getId());
            sseEmitter.complete();
        });

        emitters.put(id, sseEmitter);
        notificationSSE.setSseEmitter(sseEmitter);
        return notificationSSE;
    }

    public void delete(@NotNull String id) {
        emitters.remove(id);
    }

    public List<NotificationSSE> findAllByMember(Member member) {
        return emitters.entrySet()
                .stream()
                .filter(entry -> entry.getKey().startsWith(member.getId().toString()))  // 키 패턴 조건
                .map(entry -> new NotificationSSE(entry.getKey(), member,entry.getValue()))
                .toList();
    }

    @Scheduled(fixedRate = 30000)
    public void sendHeartbeatToAllEmitters() {
        log.info("start HeartbeatToAllEmitters");
        emitters.forEach((clientId, emitter) -> {
            try {
                emitter.send(SseEmitter.event().comment("heartbeat"));
            } catch (IOException ignored) {
            }
        });
    }

    protected String makeTimeIncludeId(int id){
        return id + "_" + Instant.now().toEpochMilli();
    }

}

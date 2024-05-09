package com.a702.hup.domain.notification;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.notification.entity.NotificationSSE;
import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
class NotificationSSERepository {
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Map<String, Object> eventCache = new ConcurrentHashMap<>();

    public NotificationSSE save(NotificationSSE notificationSSE) {
        String id = this.makeTimeIncludeId(notificationSSE.getMember().getId());
        emitters.put(id, notificationSSE.getSseEmitter());

        notificationSSE.getSseEmitter().onCompletion(() -> this.deleteById(id));
        notificationSSE.getSseEmitter().onTimeout(() -> this.deleteById(id));

        notificationSSE.setId(id);

        return notificationSSE;
    }

    public NotificationSSE saveEventCache(NotificationSSE notificationSSE, Object data) {
        eventCache.put(notificationSSE.getId(), data);
        notificationSSE.setData(data);
        return notificationSSE;
    }

    public void deleteById(String id) {
        emitters.remove(id);
    }

    public List<NotificationSSE> findAllByMember(Member member) {
        List<NotificationSSE> response = new ArrayList<>();
        try {
            List<String> ids = emitters.keySet().stream().filter(key -> key.startsWith(String.valueOf(member.getId()))).toList();
            for (String id : ids) {
                response.add(new NotificationSSE(id, member, emitters.get(id), eventCache.get(id)));
            }
            return response;
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.API_ERROR_INTERNAL_SERVER_ERROR);
        }
    }

    @Deprecated
    protected void generateId(NotificationSSE notificationSSE, String id) {
        try {
            Field targetField = notificationSSE.getClass().getField("id");
            targetField.set(notificationSSE, id);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new BusinessException(ErrorCode.API_ERROR_INTERNAL_SERVER_ERROR);
        }
    }

    protected String makeTimeIncludeId(int id) {
        return id + "_" + System.currentTimeMillis();
    }

}

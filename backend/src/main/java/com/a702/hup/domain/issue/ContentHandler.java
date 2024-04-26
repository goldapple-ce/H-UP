package com.a702.hup.domain.issue;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.data.redis.core.StringRedisTemplate;

@Slf4j
@Component
@RequiredArgsConstructor
public class ContentHandler extends TextWebSocketHandler {
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final StringRedisTemplate redisTemplate;

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("Session Established : " + session.getId());
        sessions.put(session.getId(), session);
        super.afterConnectionEstablished(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        log.info("Session Closed : " + session.getId());
        sessions.remove(session.getId());
        super.afterConnectionClosed(session, closeStatus);
    }
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        log.info("Message sender : " + session.getId());
        log.info("Message : " + message);
        for (WebSocketSession webSocketSession : sessions.values()) {
            webSocketSession.sendMessage(new TextMessage(message.getPayload()));
            log.info("Message receiver : " + webSocketSession.getId());
            log.info("Message : " + message);
        }

        // 마지막 수정 후 5초간 스케쥴러로 저장
        // scheduler.scheduleAtFixedRate(this::saveToRedis, 0, 5, TimeUnit.SECONDS);
    }

//    private void saveToRedis() {
//        String documentId = getContentId(session); // 문서 ID를 가져옵니다.
//        String content = (String) session.getAttributes().get(content);
//        if (content != null) {
//            redisTemplate.opsForValue().set("document:" + documentId, content);
//        }
//    }

}

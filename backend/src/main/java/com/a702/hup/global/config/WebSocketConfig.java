package com.a702.hup.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * @author boyjo
     * @date 4/27/24
     * @method registerStompEndpoints
     * @description 문서 하나마다 웹소켓 생성 및 등록
     **/
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws/{documentsId}/info")
                .setAllowedOriginPatterns("*");
//                .withSockJS();
//                .setHeartbeatTime(5000); // 5초 동안 메시지 교환이 없으면 세션 종료;
    }

    /**
     * @author boyjo
     * @date 4/27/24
     * @method configureMessageBroker
     * @description
     *  - enableSimpleBroker : SimpleBroker 가 /sub 경로를 가진 메시지를 처리 (구독중인 사용자에게 보냄)
     *  - setApplicationDestinationPrefixes : /pub 접두사를 가진 경로를 @MessageMapping 으로 라우팅
     **/
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub");
        registry.setApplicationDestinationPrefixes("/pub");
    }
}



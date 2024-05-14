package com.a702.hup.domain.auth.redis;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash(value = "token", timeToLive = 604800)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Token {
    @Id
    private String id;
    private String refreshToken;

    @Builder
    public Token(String id, String refreshToken) {
        this.id = id;
        this.refreshToken = refreshToken;
    }
}

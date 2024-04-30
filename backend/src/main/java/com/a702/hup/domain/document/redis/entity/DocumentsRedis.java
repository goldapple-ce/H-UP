package com.a702.hup.domain.document.redis.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@NoArgsConstructor
@RequiredArgsConstructor
@RedisHash(value = "document")
public class DocumentsRedis {
    @Id
    @NonNull
    private String documentId;
    @NonNull
    private String senderId;
    private String content = "";

    public void updateContent(String content) {
        this.content = content;
    }
}

package com.a702.hup.domain.documents.redis.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@NoArgsConstructor
@RequiredArgsConstructor
@RedisHash(value = "documents")
public class DocumentsRedis {

    @Id
    @NonNull
    private String documentsId;

    @NonNull
    private String memberId;

    @NonNull
    private String chunkNum;

    @NonNull
    private String totalChunk;

    @NonNull
    private String messageId;

    private String content = "";

    public void updateContent(String content) {
        this.content = content;
    }
}

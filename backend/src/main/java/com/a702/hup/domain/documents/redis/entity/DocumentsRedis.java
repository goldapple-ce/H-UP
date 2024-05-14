package com.a702.hup.domain.documents.redis.entity;

import com.a702.hup.application.data.dto.MessageChunkInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;
import java.util.Objects;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RedisHash(value = "documents")
public class DocumentsRedis {

    @Id
    private String documentsId;

    private Integer memberId;

    private List<MessageChunkInfo> infoList;

    public void updateInfo(MessageChunkInfo newInfo) {
        if (newInfo.getChunkNum() >= infoList.size()) {
            infoList.add(newInfo);
            return;
        }

        for (MessageChunkInfo info : infoList) {
            if (Objects.equals(info.getChunkNum(), newInfo.getChunkNum())) {
                info.setContent(newInfo.getContent());
                info.setTotalChunks(newInfo.getTotalChunks());
                info.setMessageId(newInfo.getMessageId());
                return;
            }
        }
    }
}

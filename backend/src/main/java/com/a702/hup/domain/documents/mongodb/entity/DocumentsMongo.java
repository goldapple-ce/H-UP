package com.a702.hup.domain.documents.mongodb.entity;

import com.a702.hup.application.data.dto.MessageChunkInfo;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Document(collection = "documents")
public class DocumentsMongo {
    @Id
    private String _id;
    private List<MessageChunkInfo> infoList;

    @Builder
    public DocumentsMongo(String _id) {
        this._id = _id;
        infoList = new ArrayList<>();
    }

    public void updateContent(List<MessageChunkInfo> infoList) {
        this.infoList = infoList;
    }
}

package com.a702.hup.domain.documents.mongodb.entity;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document(collection = "documents")
public class DocumentsMongo {
    @Id
    private String _id;
    private String content;

    @Builder
    public DocumentsMongo(String _id) {
        this._id = _id;
        content = "";
    }

    public void updateContent(String content) {
        this.content = content;
    }
}

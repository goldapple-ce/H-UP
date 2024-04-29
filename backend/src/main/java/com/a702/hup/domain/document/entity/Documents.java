package com.a702.hup.domain.document.entity;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@Document("document")
public class Documents {
    @Id
    private String id;
    private String content;
}

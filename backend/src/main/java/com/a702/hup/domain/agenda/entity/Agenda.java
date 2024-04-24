package com.a702.hup.domain.agenda.entity;

import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Agenda extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private AgendaStatus status;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id")
    private Issue issue;

    @Builder
    public Agenda(String content, Issue issue) {
        this.content = content;
        this.issue = issue;
        this.status = AgendaStatus.ASSIGNED;
    }
}

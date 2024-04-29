package com.a702.hup.domain.agenda.entity;

import com.a702.hup.domain.agenda_comment.entity.AgendaComment;
import com.a702.hup.domain.agenda_member.entity.AgendaMember;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

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
    @JoinColumn(name = "member_id")
    private Member requester;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id")
    private Issue issue;

    @OneToMany(mappedBy = "agenda")
    private List<AgendaMember> agendaMemberList = new ArrayList<>();

    @OneToMany(mappedBy = "agenda")
    private List<AgendaComment> agendaCommentList = new ArrayList<>();

    @Builder
    public Agenda(Issue issue, Member requester,String content) {
        addRelatedIssue(issue);
        addRelatedMember(requester);
        this.content = content;
        this.status = AgendaStatus.ASSIGNED;
    }

    private void addRelatedMember(Member member){
        this.requester = member;
        member.getAgendaList().add(this);
    }

    private void addRelatedIssue(Issue issue) {
        issue.getAgendaList().add(this);
        this.issue = issue;
    }

}

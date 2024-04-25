package com.a702.hup.domain.agenda_comment.entity;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.todo.entity.Todo;
import com.a702.hup.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AgendaComment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agenda_id")
    private Agenda agenda;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public AgendaComment(String content, Agenda agenda, Member member) {
        this.content = content;
        addRelatedAgenda(agenda);
        addRelatedMember(member);
    }

    private void addRelatedAgenda(Agenda agenda) {
        agenda.getAgendaCommentList().add(this);
        this.agenda = agenda;
    }

    private void addRelatedMember(Member member) {
        member.getAgendaCommentList().add(this);
        this.member = member;
    }
}

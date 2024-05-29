package com.a702.hup.domain.agenda_member.entity;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AgendaMember extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agenda_id")
    private Agenda agenda;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public AgendaMember(Agenda agenda, Member member) {
        addRelatedAgenda(agenda);
        addRelatedMember(member);
    }

    private void addRelatedAgenda(Agenda agenda) {
        agenda.getAgendaMemberList().add(this);
        this.agenda = agenda;
    }

    private void addRelatedMember(Member member) {
        member.getAgendaMemberList().add(this);
        this.member = member;
    }

}

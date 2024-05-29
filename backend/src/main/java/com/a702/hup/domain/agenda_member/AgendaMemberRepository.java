package com.a702.hup.domain.agenda_member;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.agenda_member.entity.AgendaMember;
import com.a702.hup.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

interface AgendaMemberRepository extends JpaRepository<AgendaMember,Integer> {
    Optional<AgendaMember> findByMemberAndAgendaAndDeletedAtIsNull(Member member, Agenda agenda);
}

package com.a702.hup.domain.agenda;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

interface AgendaRepository extends JpaRepository<Agenda,Integer> {
    Optional<Agenda> findByIssueAndRequesterAndContent(Issue issue, Member requester, String content);
    Optional<Agenda> findByIdAndDeletedAtIsNull(int id);
}

package com.a702.hup.domain.agenda;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

interface AgendaRepository extends JpaRepository<Agenda,Integer> {
    Optional<Agenda> findByIssueAndRequesterAndContent(Issue issue, Member requester, String content);
    Optional<Agenda> findByIdAndDeletedAtIsNull(int id);

    @Query("select A from Agenda as A " +
            "where A.issue.project = :project " +
            "and A.issue.project is null " +
            "and A.issue.deletedAt is null " +
            "and A.deletedAt is null")
    List<Agenda> findAllByProject(Project project);

    @Query("select A from Agenda as A join AgendaMember as AM " +
            "where A.issue.project = :project " +
            "and A.issue.deletedAt is null " +
            "and A.deletedAt is null " +
            "and A.requester = :member or AM.member = :member")
    List<Agenda> findAllByProject(Member member, Project project);
}

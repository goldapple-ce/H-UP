package com.a702.hup.domain.agenda;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

interface AgendaRepository extends JpaRepository<Agenda, Integer> {
    Optional<Agenda> findByIssueAndRequesterAndContent(Issue issue, Member requester, String content);

    Optional<Agenda> findByIdAndDeletedAtIsNull(int id);

    @Query("select A from Agenda as A " +
            "where A.issue.project = :project " +
            "and A.issue.project.deletedAt is null and A.issue.deletedAt is null and A.deletedAt is null " +
            "and (:content is null or A.content like concat('%',:content ,'%') or A.issue.title like concat('%',:content,'%')) " +
            "order by A.issue.endDate")
    List<Agenda> findAllByProjectAndOption(Project project, String content);

    @Query("select distinct A,I.endDate from Agenda as A " +
            "left join AgendaMember as AM on A.id = AM.agenda.id " +
            "join Issue as I on A.issue.id = I.id and I.deletedAt is null  " +
            "where I.project= :project " +
            "and A.status != 'COMPLETED' and I.status != 'COMPLETED' " +
            "and (A.requester = :member or AM.member = :member) " +
            "and I.endDate between :now and :endDate " +
            "order by A.status, A.issue.endDate")
    List<Object[]> findAllByProject( Project project, Member member,LocalDate now, LocalDate endDate);
}

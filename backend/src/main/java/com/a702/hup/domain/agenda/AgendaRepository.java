package com.a702.hup.domain.agenda;

import com.a702.hup.domain.agenda.dto.AgendaOptionOfFind;
import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.agenda.entity.AgendaStatus;
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

    @Query("select distinct A,I from Agenda as A " +
            "left join AgendaMember as AM " +
            "   on A.id = AM.agenda.id " +
            "join Issue as I " +
            "   on A.issue.id = I.id " +
            "   and I.deletedAt is null " +
            "   and now() <= I.endDate " +
            "   and I.status != 'COMPLETED'" +
            "where I.project = :project " +
            "and ((:statusList) is null or A.status in (:statusList)) " +
            "and ((:#{#option.type} is null and (:memberList is null or A.requester.id in  (:memberList) or AM.member.id in  (:memberList))) " +
            "   or (:#{#option.type}='requester' and A.requester.id in (:memberList)) " +
            "   or (:#{#option.type}='asignee' and AM.member.id in (:memberList))) " +
            "and (:#{#option.content} is null or A.content like concat('%',:#{#option.content} ,'%') or I.title like concat('%',:#{#option.content} ,'%')) " +
            "order by A.status, I.endDate")
    List<Object[]> findAllByProjectAndOption(Project project, List<Integer> memberList, List<AgendaStatus> statusList, AgendaOptionOfFind option);

    @Query("select distinct A,I.endDate from Agenda as A " +
            "left join AgendaMember as AM on A.id = AM.agenda.id " +
            "join Issue as I on A.issue.id = I.id and I.deletedAt is null  " +
            "where I.project= :project " +
            "and A.status != 'COMPLETED' and I.status != 'COMPLETED' " +
            "and (A.requester = :member or AM.member = :member) " +
            "and I.endDate between :now and :endDate " +
            "order by A.status, I.endDate")
    List<Object[]> findAllByProject( Project project, Member member,LocalDate now, LocalDate endDate);
}

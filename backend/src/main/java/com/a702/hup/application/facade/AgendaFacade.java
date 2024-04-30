package com.a702.hup.application.facade;

import com.a702.hup.application.data.request.AgendaAssigneeSaveRequest;
import com.a702.hup.application.data.request.AgendaCreateRequest;
import com.a702.hup.application.data.request.AgendaUpdateRequest;
import com.a702.hup.domain.agenda.AgendaService;
import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.agenda.entity.AgendaStatus;
import com.a702.hup.domain.agenda_member.AgendaMemberService;
import com.a702.hup.domain.agenda_member.entity.AgendaMember;
import com.a702.hup.domain.issue.IssueService;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue_member.IssueMemberService;
import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AgendaFacade {
    // todo 모든 메서드에 인증이 필요함. AOP 활용해서 인증 로직 빼야함.
    private final AgendaService agendaService;
    private final MemberService memberService;
    private final IssueService issueService;
    private final IssueMemberService issueMemberService;
    private final AgendaMemberService agendaMemberService;

    /**
     * @author 강용민
     * @date 2024-04-25
     * @description 의사결정 요청 함수
     */
    @Transactional
    public void saveAgenda(User user, AgendaCreateRequest request) {
        Member requester = memberService.findById(Integer.parseInt(user.getUsername()));
        Issue issue = issueService.findById(request.getIssueId());
        issueMemberService.validationRole(issue, requester);
        agendaService.save(issue, requester, request.getContent());
    }

    /**
     * @author 강용민
     * @date 2024-04-30
     * @description 의사결정 담당자 요청
     */
    @Transactional
    public void saveAssignee(User user, AgendaAssigneeSaveRequest request) {
        Agenda agenda = agendaService.findById(request.getAgendaId());
        validation(agenda,user);

        Member assignee = memberService.findById(request.getMemberId());
        agendaMemberService.save(agenda,assignee);
    }


    /**
     * @author 강용민
     * @date 2024-04-30
     * @description 의사결정 수정
     */
    @Transactional
    public void updateAgenda(User user, AgendaUpdateRequest request) {
        Agenda agenda = agendaService.findById(request.getAgendaId());
        validation(agenda,user);
        agenda.update(request.getContent(), AgendaStatus.valueOf(request.getStatus()));
    }

    /**
     * @author 강용민
     * @date 2024-04-30
     * @description 해당 이슈에 권한이 있는지 검사
     */
    private void validation(Agenda agenda,User user){
        Member member = memberService.findById(user.getUsername());
        issueMemberService.validationRole(agenda.getIssue(),member);
    }

    /**
     * @author 강용민
     * @date 2024-04-30
     * @description 의사결정 삭제
     */
    @Transactional
    public void deleteAgenda(User user, int agendaId) {
        Agenda agenda = agendaService.findById(agendaId);
        Member member = memberService.findById(user.getUsername());
        issueMemberService.validationRole(agenda.getIssue(),member);
        agenda.deleteSoftly();
    }

    @Transactional
    public void deleteAssignee(User user, int assigneeId) {
        Member member = memberService.findById(user.getUsername());
        AgendaMember assignee = agendaMemberService.findById(assigneeId);

        issueMemberService.validationRole(assignee.getAgenda().getIssue(), member);
        assignee.deleteSoftly();
    }
}

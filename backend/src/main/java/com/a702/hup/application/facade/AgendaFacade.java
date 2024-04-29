package com.a702.hup.application.facade;

import com.a702.hup.application.dto.request.AgendaAssigneeSaveRequest;
import com.a702.hup.application.dto.request.AgendaCreateRequest;
import com.a702.hup.domain.agenda.AgendaService;
import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.agenda_member.AgendaMemberService;
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
     * @date 2024-04-29
     * @description 의사결정 담당자 저장 메소드
     */
    @Transactional
    public void saveAgendaMember(User user, AgendaAssigneeSaveRequest request) {
        Member requester = memberService.findById(Integer.parseInt(user.getUsername()));
        Agenda agenda = agendaService.findById(request.getAgendaId());
        issueMemberService.validationRole(agenda.getIssue(),requester);

        Member assignee = memberService.findById(request.getAssigneeId());
        agendaMemberService.save(agenda,assignee);
    }
}

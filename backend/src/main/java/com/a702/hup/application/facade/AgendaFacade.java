package com.a702.hup.application.facade;

import com.a702.hup.application.data.request.AgendaAssigneeSaveRequest;
import com.a702.hup.application.data.request.AgendaCreateRequest;
import com.a702.hup.application.data.request.AgendaInfoByProjectRequest;
import com.a702.hup.application.data.request.AgendaUpdateRequest;
import com.a702.hup.application.data.response.AgendaInfoListByIssueResponse;
import com.a702.hup.application.data.response.AgendaInfoListByProjectResponse;
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
import com.a702.hup.domain.project.ProjectService;
import com.a702.hup.domain.project.entity.Project;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    private final ProjectService projectService;

    /**
     * @author 강용민
     * @date 2024-04-25
     * @description 의사결정 요청 함수
     */
    @Transactional
    public void saveAgenda(int memberId, AgendaCreateRequest request) {
        Member requester = memberService.findById(memberId);
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
    public void saveAssignee(int memberId, AgendaAssigneeSaveRequest request) {
        Agenda agenda = agendaService.findById(request.getAgendaId());
        validation(agenda,memberId);

        Member assignee = memberService.findById(request.getMemberId());
        agendaMemberService.save(agenda,assignee);
    }


    /**
     * @author 강용민
     * @date 2024-04-30
     * @description 의사결정 수정
     */
    @Transactional
    public void updateAgenda(int memberId, AgendaUpdateRequest request) {
        Agenda agenda = agendaService.findById(request.getAgendaId());
        validation(agenda,memberId);
        agenda.update(request.getContent(), AgendaStatus.valueOf(request.getStatus()));
    }

    /**
     * @author 강용민
     * @date 2024-04-30
     * @description 해당 이슈에 권한이 있는지 검사
     */
    private void validation(Agenda agenda,int memberId){
        Member member = memberService.findById(memberId);
        issueMemberService.validationRole(agenda.getIssue(),member);
    }

    /**
     * @author 강용민
     * @date 2024-04-30
     * @description 의사결정 삭제
     */
    @Transactional
    public void deleteAgenda(int memberId, int agendaId) {
        Agenda agenda = agendaService.findById(agendaId);
        Member member = memberService.findById(memberId);
        issueMemberService.validationRole(agenda.getIssue(),member);
        agenda.deleteSoftly();
    }

    @Transactional
    public void deleteAssignee(int memberId, int assigneeId) {
        Member member = memberService.findById(memberId);
        AgendaMember assignee = agendaMemberService.findById(assigneeId);

        issueMemberService.validationRole(assignee.getAgenda().getIssue(), member);
        assignee.deleteSoftly();
    }

    public AgendaInfoListByIssueResponse getAgendaInfoListByIssue(int issueId){
        Issue issue = issueService.findById(issueId);
        return AgendaInfoListByIssueResponse.from(issue);
    }

    public AgendaInfoListByProjectResponse getAgendaInfoListByProject(int projectId, AgendaInfoByProjectRequest request ){
        Project project = projectService.findById(projectId);
        List<Object[]> agendaList = agendaService.findByProjectAndOption(project, request.getMemberIdList(),request.getStatusList(),request.toOption());
        return AgendaInfoListByProjectResponse.from(agendaList);
    }

    public AgendaInfoListByProjectResponse getNearAgendaInfoListByProject(int memberId, int projectId) {
        Member member = memberService.findById(memberId);
        Project project = projectService.findById(projectId);
        List<Object[]> agendaList = agendaService.findNearByProject(project,member);
        return AgendaInfoListByProjectResponse.from(agendaList);

    }
}

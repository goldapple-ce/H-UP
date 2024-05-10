package com.a702.hup.application.facade;

import com.a702.hup.application.data.dto.MemberInfo;
import com.a702.hup.application.data.request.ProjectMemberSaveRequest;
import com.a702.hup.application.data.request.ProjectSaveRequest;
import com.a702.hup.application.data.response.ProjectInfoListResponse;
import com.a702.hup.application.data.response.ProjectMembersResponse;
import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.ProjectException;
import com.a702.hup.domain.project.ProjectService;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.domain.project_member.ProjectMemberService;
import com.a702.hup.domain.project_member.entity.ProjectMember;
import com.a702.hup.domain.team.TeamService;
import com.a702.hup.domain.team.entity.Team;
import com.a702.hup.domain.team_member.TeamMemberService;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProjectFacade {
    private final ProjectService projectService;
    private final MemberService memberService;
    private final TeamService teamService;
    private final TeamMemberService teamMemberService;
    private final ProjectMemberService projectMemberService;

    /**
     * @author 강용민
     * @date 2024-05-03
     * @description
     */
    @Transactional
    public void save(int memberId, ProjectSaveRequest request){
        Member member = memberService.findById(memberId);
        Team team = teamService.findById(request.getTeamId());
        validation(member,team);
        projectService.save(team,request.getName(),member);
    }

    /**
     * @author 강용민
     * @date 2024-05-03
     * @description 프로젝트 멤버 저장
     */
    @Transactional
    public void saveProjectMember(int memberId, ProjectMemberSaveRequest request) {
        Member member = memberService.findById(memberId);
        Project project = projectService.findById(request.getProjectId());
        validation(member,project.getTeam());

        for(int requestMemberId : request.getMemberList()){
            Member requestMember = memberService.findById(requestMemberId);
            validation(requestMember,project.getTeam());
            projectMemberService.save(project,requestMember);
        }
    }

    /**
     * @author 손현조
     * @date 2024-05-09
     * @description 프로젝트 멤버 조회
     **/
    public ProjectMembersResponse findMembers(Integer memberId, Integer projectId) {
        Project project = projectService.findById(projectId);
        projectMemberService.validation(memberService.findById(memberId), projectService.findById(projectId));

        List<MemberInfo> memberInfoList = new ArrayList<>();
        for (ProjectMember projectMember : projectMemberService.findMembers(project)) {
            memberInfoList.add(MemberInfo.from(projectMember.getMember()));
        }
        return ProjectMembersResponse.from(memberInfoList);
    }

    private void validation(Member member, Team team){
        if(!teamMemberService.isMember(member,team)){
            throw new ProjectException(ErrorCode.API_ERROR_PROJECT_NOT_ROLE);
        }
    }

    /**
     * @author 강용민
     * @date 2024-05-10
     * @description
     */
    public ProjectInfoListResponse findByTeam(Integer teamId) {
        Team team = teamService.findById(teamId);
        List<Project> projectList = projectService.findAllByTeam(team);
        return ProjectInfoListResponse.from(projectList);
    }
}
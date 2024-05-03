package com.a702.hup.application.facade;

import com.a702.hup.application.data.request.AddTeamMembersRequest;
import com.a702.hup.application.data.request.TeamSaveRequest;
import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.team.TeamService;
import com.a702.hup.domain.team.entity.Team;
import com.a702.hup.domain.team_member.TeamMemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamFacade {
    private final TeamService teamService;
    private final MemberService memberService;
    private final TeamMemberService teamMemberService;

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description 팀 생성 함수
     **/
    @Transactional
    public void save(TeamSaveRequest teamSaveRequest, int memberId) {
        // save team
        Team team = teamService.save(teamSaveRequest.getTeamName());
        
        // find member
        Member member = memberService.findById(memberId);
        
        // relate member to team
        teamMemberService.save(team, member);
    }

    @Transactional
    public void addMembers(int memberId, AddTeamMembersRequest addTeamMembersRequest) {
        // 현재 팀
        Team team = teamService.findById(addTeamMembersRequest.getTeamId());

        // 현재 팀 소속 멤버인지 확인
        teamMemberService.isMember(memberId, team);

    }
}

package com.a702.hup.application.facade;

import com.a702.hup.application.data.dto.MemberInfo;
import com.a702.hup.application.data.request.AddTeamMembersRequest;
import com.a702.hup.application.data.request.TeamSaveRequest;
import com.a702.hup.application.data.response.MemberInfoListResponse;
import com.a702.hup.application.data.response.TeamInfoListResponse;
import com.a702.hup.domain.member.MemberException;
import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.team.TeamService;
import com.a702.hup.domain.team.entity.Team;
import com.a702.hup.domain.team_member.TeamMemberException;
import com.a702.hup.domain.team_member.TeamMemberService;
import com.a702.hup.domain.team_member.entity.TeamMember;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

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

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description 팀 멤버 초대. 이미 속한 애들은 알아서 걸러줌
     **/
    @Transactional
    public void addMembers(int memberId, AddTeamMembersRequest addTeamMembersRequest) {
        log.info("[+] TeamFacade :: addMembers :: start");

        // 현재 팀과 생성자 가져오기
        Team team = teamService.findById(addTeamMembersRequest.getTeamId());
        Member member = memberService.findById(memberId);
        log.info("[+] TeamFacade :: addMembers :: team : {}, member : {}", team.getName(), member.getName());
        log.info("[+] TeamFacade :: addMembers :: check hasAuth...");
        // 생성자가 현재 팀 소속 멤버인지 확인
        if(!teamMemberService.isMember(member, team))
            throw new TeamMemberException(ErrorCode.API_ERROR_IS_NOT_TEAM_MEMBER);
        log.info("[+] TeamFacade :: addMembers :: complete !");

        // 현재 팀 소속 멤버들 가져오기
        List<Integer> existingMemberIds = teamMemberService.findAllInTeam(team)
                .stream()
                .map(teamMember -> teamMember.getMember().getId())
                .toList();

        // 추가하려는 멤버 중 이미 소속한 멤버는 제외
        log.info("[+] TeamFacade :: addMembers :: members to add : {}", Arrays.toString(addTeamMembersRequest.getMemberIdList().toArray()));
        List<Integer> newMemberIds = addTeamMembersRequest.getMemberIdList().stream()
                .filter(memberIdToAdd -> !existingMemberIds.contains(memberIdToAdd))
                .toList();
        log.info("[+] TeamFacade :: addMembers :: after except members already in : {}", Arrays.toString(newMemberIds.toArray()));

        // 추가할 멤버들
        List<Member> memberList = memberService.findAll(newMemberIds);

        // 탈퇴된 회원을 초대하면 에러
        // 위에서 소속 멤버가 제껴진게 newMemberIds.
        // findAll(newMemberIds)의 결과값인 memberList와 size가 다르다면 탈퇴된 회원이 속해있음을 의미함.
        if(newMemberIds.size() != memberList.size())
            throw new MemberException(ErrorCode.API_ERROR_MEMBER_NOT_FOUND);

        // 모두 존재하는 멤버라면 pass
        if(!memberList.isEmpty()) {
            // 생성된 팀 멤버들
            List<TeamMember> newTeamMembers = memberList.stream()
                    .map(memberToAdd -> TeamMember.builder()
                            .member(memberToAdd)
                            .team(team)
                            .build())
                    .toList();
            log.info("[+] TeamFacade :: adMembers :: team members to add : {}", Arrays.toString(newTeamMembers.toArray()));

            // saveAll로 모두 저장
            teamMemberService.saveAll(newTeamMembers);
        }

        log.info("[+] TeamFacade :: addMembers :: end");
    }

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description 팀 멤버 조회
     **/
    public MemberInfoListResponse findTeamMembers(int memberId, int teamId) {
        // 조회하려는 멤버
        Member member = memberService.findById(memberId);
        Team team = teamService.findById(teamId);

        // 조회 권한 있는지 확인
        if(!teamMemberService.isMember(member, team))
            throw new TeamMemberException(ErrorCode.API_ERROR_IS_NOT_TEAM_MEMBER);

        // 팀에 속한 멤버들의 정보 반환
        return MemberInfoListResponse.builder()
                .memberInfoList(teamMemberService.findAllInTeam(team).stream()
                        .map(teamMember -> MemberInfo.from(teamMember.getMember()))
                        .toList())
                .build();
    }

    /**
     * @author 강용민
     * @date 2024-05-10
     * @description
     */
    public TeamInfoListResponse findByMember(int memberId){
        Member member = memberService.findById(memberId);
        List<Team> teamList = teamService.findByMember(member);
        return TeamInfoListResponse.of(teamList);
    }
}

package com.a702.hup.domain.team_member;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.team.entity.Team;
import com.a702.hup.domain.team_member.entity.TeamMember;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamMemberService {
    private final TeamMemberRepository teamMemberRepository;

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description 팀 소속 멤버 전원 검색
     **/
    public List<TeamMember> findAllInTeam(Team team) {
        return teamMemberRepository.findAllByTeam(team);
    }

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description 팀에 멤버 추가
     **/
    @Transactional
    public void save(Team team, Member member) {
        teamMemberRepository.save(TeamMember.builder()
                .team(team)
                .member(member)
                .build());
    }

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description teamMember 일괄 저장
     **/
    @Transactional
    public void saveAll(List<TeamMember> teamMembers) {
        teamMemberRepository.saveAll(teamMembers);
    }

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description 팀 소속 여부 체크
     **/
    public boolean isMember(Member member, Team team) {
        return teamMemberRepository.existsByTeamAndMember(team, member);
    }
}

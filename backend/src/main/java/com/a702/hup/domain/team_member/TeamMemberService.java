package com.a702.hup.domain.team_member;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.team.entity.Team;
import com.a702.hup.domain.team_member.entity.TeamMember;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamMemberService {
    private final TeamMemberRepository teamMemberRepository;

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

    public boolean isMember(int memberId, Team team) {
        return false;
    }
}

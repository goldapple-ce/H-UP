package com.a702.hup.domain.team_member;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.team.entity.Team;
import com.a702.hup.domain.team_member.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamMemberRepository extends JpaRepository<TeamMember,Integer> {
    boolean existsByTeamAndMember(Team team, Member member);
}

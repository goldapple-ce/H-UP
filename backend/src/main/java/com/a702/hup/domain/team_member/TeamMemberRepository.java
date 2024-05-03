package com.a702.hup.domain.team_member;

import com.a702.hup.domain.team_member.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamMemberRepository extends JpaRepository<TeamMember,Integer> {
}

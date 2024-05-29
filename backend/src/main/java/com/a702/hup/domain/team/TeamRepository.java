package com.a702.hup.domain.team;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

interface TeamRepository extends JpaRepository<Team,Integer> {
    @Query("select T from Team as T " +
            "join TeamMember as TM on TM.team = T " +
            "where T.deletedAt is null " +
            "   and TM.member = :member")
    List<Team> findByMember(Member member);
}

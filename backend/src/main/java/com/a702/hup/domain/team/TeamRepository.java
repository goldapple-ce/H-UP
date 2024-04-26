package com.a702.hup.domain.team;

import com.a702.hup.domain.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

interface TeamRepository extends JpaRepository<Team,Integer> {
}

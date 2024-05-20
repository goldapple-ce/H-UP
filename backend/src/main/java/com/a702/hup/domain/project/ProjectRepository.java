package com.a702.hup.domain.project;

import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.domain.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface ProjectRepository extends JpaRepository<Project,Integer> {
    List<Project> findAllByTeamAndDeletedAtIsNull(Team team);
}

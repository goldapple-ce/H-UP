package com.a702.hup.domain.project;

import com.a702.hup.domain.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

interface ProjectRepository extends JpaRepository<Project,Integer> {
}

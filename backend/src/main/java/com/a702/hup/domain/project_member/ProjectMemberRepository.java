package com.a702.hup.domain.project_member;

import com.a702.hup.domain.project_member.entity.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;

interface ProjectMemberRepository extends JpaRepository<ProjectMember,Integer> {
}

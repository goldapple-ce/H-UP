package com.a702.hup.domain.project_member;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.domain.project_member.entity.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

interface ProjectMemberRepository extends JpaRepository<ProjectMember,Integer> {
    Optional<ProjectMember> findByProjectAndMember(Project project, Member member);
}

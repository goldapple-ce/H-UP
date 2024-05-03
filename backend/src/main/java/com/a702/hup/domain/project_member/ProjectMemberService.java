package com.a702.hup.domain.project_member;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.domain.project_member.entity.ProjectMember;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectMemberService {
    private final ProjectMemberRepository projectMemberRepository;

    /**
     * @author 강용민
     * @date 2024-05-03
     * @description 저장
     */
    @Transactional
    public ProjectMember save(Project project, Member member) {
        return projectMemberRepository.findByProjectAndMember(project, member).orElseGet(() ->
                projectMemberRepository.save(ProjectMember.builder()
                        .member(member)
                        .project(project).build()));
    }

    /**
     * @author 강용민
     * @date 2024-05-03
     * @description 프로젝트 내 멤버인지 확인
     */
    public boolean isMember(Project project, Member member){
        return projectMemberRepository.findByProjectAndMember(project,member).isPresent();
    }
}

package com.a702.hup.domain.project;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.domain.project_member.ProjectMemberService;
import com.a702.hup.domain.team.entity.Team;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectMemberService projectMemberService;

    /**
     * @author 강용민
     * @date 2024-05-03
     * @description 프로젝트 저장, 저장 시 프로젝트 멤버 자동 등록
     */
    @Transactional
    public Project save(Team team,String name, Member member){
        Project project = projectRepository.save(Project.builder()
                .team(team)
                .name(name).build());

        projectMemberService.save(project,member);
        return project;
    }

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description 프로젝트 검색
     **/
    public Project findById(int projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectException(ErrorCode.API_ERROR_PROJECT_NOT_FOUND));
    }
}

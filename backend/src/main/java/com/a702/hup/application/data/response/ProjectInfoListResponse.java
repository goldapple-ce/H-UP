package com.a702.hup.application.data.response;

import com.a702.hup.domain.project.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Getter
public class ProjectInfoListResponse {
    private List<ProjectInfo> projectInfoList;

    public static ProjectInfoListResponse from(List<Project> projectList){
        List<ProjectInfo> projectInfoList = new ArrayList<>();
        for(Project project : projectList){
            projectInfoList.add(ProjectInfo.of(project));
        }
        return new ProjectInfoListResponse(projectInfoList);
    }

    @Getter
    @AllArgsConstructor
    static class ProjectInfo{
        private int id;
        private String name;

        public static ProjectInfo of(Project project){
            return new ProjectInfo(project.getId(), project.getName());
        }
    }
}

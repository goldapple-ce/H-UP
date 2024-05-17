package com.a702.hup.application.data.dto;

import com.a702.hup.domain.project.entity.Project;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

public class ProjectDTO {

    @Getter
    public static class SaveProject {
        @NotNull
        private int teamId;
        @NotBlank
        private String name;
    }

    @Getter
    public static class AddProjectMember {
        @NotNull
        private int projectId;
        @NotNull
        private List<Integer> memberList;
    }

    @Getter
    @AllArgsConstructor
    public static class ProjectInfo {
        private int id;
        private String name;
        private String img;

        public static ProjectInfo of(Project project){
            return new ProjectInfo(project.getId(), project.getName(), project.getImg());
        }
    }

    @Getter
    @AllArgsConstructor
    public static class ProjectInfoList {
        private List<ProjectInfo> projectInfoList;

        public static ProjectInfoList from(List<Project> projectList){
            List<ProjectInfo> projectInfoList = projectList.stream()
                    .map(ProjectInfo::of)
                    .toList();

            return new ProjectInfoList(projectInfoList);
        }
    }
}

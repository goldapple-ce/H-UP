package com.a702.hup.application.data.dto;

import com.a702.hup.domain.project.entity.Project;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

public class ProjectDTO {

    @Getter
    public static class Save {
        @NotNull
        private int teamId;
        @NotBlank
        private String name;
    }

    @Getter
    public static class AddMember {
        @NotNull
        private int projectId;
        @NotNull
        private List<Integer> memberList;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private int id;
        private String name;
        private String img;

        public static Response of(Project project){
            return new Response(project.getId(), project.getName(), project.getImg());
        }
    }

    @Getter
    @AllArgsConstructor
    public static class ResponseList {
        private List<Response> responseList;

        public static ResponseList from(List<Project> projectList){
            List<Response> responseList = projectList.stream()
                    .map(Response::of)
                    .toList();

            return new ResponseList(responseList);
        }
    }
}

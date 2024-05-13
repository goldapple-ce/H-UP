package com.a702.hup.application.data.dto;

import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue.entity.IssueStatus;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

public class IssueDTO {

    @Getter
    public static class Save {
        @NotNull
        private int projectId;
    }

    @Getter
    public static class UpdateStatus {
        private int issueId;
        private IssueStatus status;
    }

    @Getter
    public static class UpdateDate {
        private LocalDate startTime;
        private LocalDate endTime;
    }

    @Getter
    @Builder
    public static class Response {
        private int issueId;
        private String title;
        private IssueStatus status;
        @JsonFormat(pattern = "YYYY-MM-dd")
        private LocalDate startDate;
        @JsonFormat(pattern = "YYYY-MM-dd")
        private LocalDate endDate;
        private MemberInfo memberInfo;

        public static Response from(Issue issue) {
            return Response.builder()
                    .issueId(issue.getId())
                    .title(issue.getTitle())
                    .status(issue.getStatus())
                    .startDate(issue.getStartDate())
                    .endDate(issue.getEndDate())
                    .memberInfo(MemberInfo.from(issue.getMember()))
                    .build();
        }
    }

    @Getter
    @Builder
    public static class DetailResponse {
        private String title;
        private String content;
        private LocalDate startDate;
        private LocalDate endDate;
        private Integer projectId;
        private String projectName;
        private Integer producerId;
        private String producerName;
        private List<MemberInfo> memberInfoList;

        public static DetailResponse toResponse(
                Issue issue,
                String content,
                Project project,
                Member member,
                List<MemberInfo> memberInfoList
        ) {
            return DetailResponse.builder()
                    .title(issue.getTitle())
                    .content(content)
                    .startDate(issue.getStartDate())
                    .endDate(issue.getEndDate())
                    .projectId(project.getId())
                    .projectName(project.getName())
                    .producerId(member.getId())
                    .producerName(member.getName())
                    .memberInfoList(memberInfoList)
                    .build();
        }
    }

    @Getter
    @Builder
    public static class ResponseList {
        private List<Response> responseList;
    }
}

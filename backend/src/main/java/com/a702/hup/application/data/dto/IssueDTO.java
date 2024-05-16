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
    public static class Update {
        @NotNull
        private int issueId;
        private String title;
        @NotNull
        private IssueStatus status;
        private LocalDate startDate;
        private LocalDate endDate;
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
        private MemberDTO.MemberInfo memberInfo;
        private List<MemberDTO.MemberInfo> assigneeInfoList;

        public static Response from(Issue issue) {
            return Response.builder()
                    .issueId(issue.getId())
                    .title(issue.getTitle())
                    .status(issue.getStatus())
                    .startDate(issue.getStartDate())
                    .endDate(issue.getEndDate())
                    .memberInfo(MemberDTO.MemberInfo.from(issue.getMember()))
                    .assigneeInfoList(issue.getIssueMemberList().stream()
                            .map(issueMember -> MemberDTO.MemberInfo.from(issueMember.getMember()))
                            .toList())
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
        private MemberDTO.MemberInfo producerInfo;
        private List<MemberDTO.MemberInfo> assigneeInfoList;

        public static DetailResponse toResponse(
                Issue issue,
                String content,
                Project project,
                Member member,
                List<MemberDTO.MemberInfo> memberInfoList
        ) {
            return DetailResponse.builder()
                    .title(issue.getTitle())
                    .content(content)
                    .startDate(issue.getStartDate())
                    .endDate(issue.getEndDate())
                    .projectId(project.getId())
                    .projectName(project.getName())
                    .producerInfo(MemberDTO.MemberInfo.from(member))
                    .assigneeInfoList(memberInfoList)
                    .build();
        }
    }

    @Getter
    @Builder
    public static class ResponseList {
        private List<Response> responseList;
    }
}

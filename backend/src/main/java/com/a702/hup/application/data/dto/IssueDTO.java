package com.a702.hup.application.data.dto;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.comment.entity.Comment;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue.entity.IssueStatus;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.domain.todo.entity.Todo;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

public class IssueDTO {

    @Getter
    public static class Save {
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
        private LocalDate startDate;
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
    public static class ResponseList {
        private List<Response> responseList;
    }

    @Getter
    @Builder
    public static class ResponseListByStatus {
        private List<Response> createdList;
        private List<Response> selectedList;
        private List<Response> progressList;
        private List<Response> completedList;
        private List<Response> approvedList;
    }
}

package com.a702.hup.application.data.response;

import com.a702.hup.domain.issue.entity.Issue;
import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class IssueDetailsResponse {
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer projectId;
    private String projectName;
    private Integer producerId;
    private String producerName;


    public static IssueDetailsResponse toResponse(Issue issue) {
        return IssueDetailsResponse.builder()
                .title(issue.getTitle())
                .startDate(issue.getStartDate())
                .endDate(issue.getEndDate())
                .projectId(issue.getProject().getId())
                .projectName(issue.getProject().getName())
                .producerId(issue.getMember().getId())
                .producerName(issue.getMember().getName())
                .build();
    }
}

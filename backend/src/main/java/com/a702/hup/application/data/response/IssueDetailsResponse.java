package com.a702.hup.application.data.response;

import com.a702.hup.application.data.dto.MemberInfo;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class IssueDetailsResponse {
    private String title;
    private String content;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer projectId;
    private String projectName;
    private Integer producerId;
    private String producerName;
    private List<MemberInfo> memberInfoList;


    public static IssueDetailsResponse toResponse(
            Issue issue,
            String content,
            Project project,
            Member member,
            List<MemberInfo> memberInfoList) {
        return IssueDetailsResponse.builder()
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

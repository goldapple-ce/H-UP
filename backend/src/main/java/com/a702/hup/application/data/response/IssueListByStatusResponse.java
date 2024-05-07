package com.a702.hup.application.data.response;

import com.a702.hup.application.data.dto.IssueInfo;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class IssueListByStatusResponse {
    private List<IssueInfo> createdIssueList;
    private List<IssueInfo> selectedIssueList;
    private List<IssueInfo> progressIssueList;
    private List<IssueInfo> completedIssueList;
    private List<IssueInfo> approvedIssueList;

    @Builder
    public IssueListByStatusResponse(List<IssueInfo> createdIssueList, List<IssueInfo> selectedIssueList, List<IssueInfo> progressIssueList, List<IssueInfo> completedIssueList, List<IssueInfo> approvedIssueList) {
        this.createdIssueList = createdIssueList;
        this.selectedIssueList = selectedIssueList;
        this.progressIssueList = progressIssueList;
        this.completedIssueList = completedIssueList;
        this.approvedIssueList = approvedIssueList;
    }
}

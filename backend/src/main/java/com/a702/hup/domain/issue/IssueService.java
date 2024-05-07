package com.a702.hup.domain.issue;

import com.a702.hup.application.data.dto.IssueInfo;
import com.a702.hup.application.data.dto.MemberInfo;
import com.a702.hup.application.data.response.IssueDetailsResponse;
import com.a702.hup.application.data.response.IssueListByStatusResponse;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue.entity.IssueStatus;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class IssueService {
    private final IssueRepository issueRepository;

    /**
     * @author 강용민
     * @date 2024-04-26
     * @description id로 찾기, 삭제 되었을 시 못 찾음
     */
    public Issue findById(int id) {
        return issueRepository.findByIdAndDeletedAtIsNull(id).orElseThrow(() ->
                new IssueException(ErrorCode.API_ERROR_ISSUE_NOT_FOUND));
    }

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description 칸반 보드 상태 별 이슈 조회
     **/
    public IssueListByStatusResponse findIssueListByTypeByProjectId(int projectId) {
        List<IssueInfo> issueList = issueRepository.findByProjectId(projectId)
                .orElseThrow(() -> new IssueException(ErrorCode.API_ERROR_ISSUE_NOT_FOUND)).stream()
                .map(IssueInfo::from)
                .toList();

        List<IssueInfo> created = new ArrayList<>();
        List<IssueInfo> selected = new ArrayList<>();
        List<IssueInfo> progress = new ArrayList<>();
        List<IssueInfo> completed = new ArrayList<>();
        List<IssueInfo> approved = new ArrayList<>();
        issueList.forEach(issue -> {
            IssueStatus status = issue.getStatus();
            switch (status) {
                case CREATED -> created.add(issue);
                case PROGRESS -> progress.add(issue);
                case SELECTED -> selected.add(issue);
                case COMPLETED -> completed.add(issue);
                case APPROVED -> approved.add(issue);
                default -> log.error("Issue status not recognized");
            }
        });

        return IssueListByStatusResponse.builder()
                .createdIssueList(created)
                .selectedIssueList(selected)
                .progressIssueList(progress)
                .completedIssueList(completed)
                .approvedIssueList(approved).build();
    }


    /**
     * @author 강용민
     * @date 2024-04-26
     * @description 저장
     */
    public Issue save(Project project, Member member, String title, LocalDate startDate, LocalDate endDate) {
        return issueRepository.save(Issue.builder()
                .project(project)
                .member(member)
                .title(title)
                .startDate(startDate)
                .endDate(endDate)
                .build());
    }

    public Issue save(Project project, Member member) {
        return issueRepository.save(Issue.builder()
                .project(project)
                .member(member)
                .build());
    }

}

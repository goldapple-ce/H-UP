package com.a702.hup.domain.issue;

import com.a702.hup.application.data.dto.IssueDTO;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

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
     * @date 2024-05-07
     * @description 프로젝트 별 이슈 조회
     **/
    public List<Issue> findByProjectId(int projectId) {
        return issueRepository.findByProjectId(projectId)
                .orElseThrow(() -> new IssueException(ErrorCode.API_ERROR_ISSUE_NOT_FOUND));
    }

    /**
     * @author 강용민
     * @date 2024-04-26
     * @description 저장
     */
    @Transactional
    public Issue save(Project project, Member member, String title, LocalDate startDate, LocalDate endDate) {
        return issueRepository.save(Issue.builder()
                .project(project)
                .member(member)
                .title(title)
                .startDate(startDate)
                .endDate(endDate)
                .build());
    }

    @Transactional
    public Issue save(Project project, Member member) {
        return issueRepository.save(Issue.builder()
                .project(project)
                .member(member)
                .build());
    }

    @Transactional
    public Issue update(IssueDTO.Update request) {
        Issue issue = findById(request.getIssueId());
        issue.updateIssue(request);
        return issue;
    }
}

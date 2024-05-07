package com.a702.hup.domain.issue;

import com.a702.hup.application.data.dto.IssueDTO;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue.entity.IssueStatus;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
     * @date 2024-05-07
     * @description 페이징 이용한 팀에 속한 이슈 전체 조회
     **/
    public IssueDTO.ResponseList findIssuePageByTeamId(int teamId, int lastId, int pageSize) {
        // 프로젝트 별 이슈 조회
        return IssueDTO.ResponseList.builder()
                .responseList(issueRepository.findPageByTeamId(teamId, lastId, PageRequest.ofSize(pageSize)).stream()
                        .map(IssueDTO.Response::from)
                        .toList()
                )
                .build();
    }

    /**
     * @author 이경태
     * @date 2024-05-07
     * @description 상태 별 상위 5개 이슈 조회 함수
     **/
    public IssueDTO.ResponseListByStatus findTop5IssueEachStatus(int projectId) {
        Map<IssueStatus, List<Issue>> issuesByStatus = issueRepository.findTop5IssueEachStatus(projectId).stream()
                .collect(Collectors.groupingBy(Issue::getStatus));

        return IssueDTO.ResponseListByStatus.builder()
                .createdList(mapToResponse(issuesByStatus.get(IssueStatus.CREATED)))
                .selectedList(mapToResponse(issuesByStatus.get(IssueStatus.SELECTED)))
                .progressList(mapToResponse(issuesByStatus.get(IssueStatus.PROGRESS)))
                .completedList(mapToResponse(issuesByStatus.get(IssueStatus.COMPLETED)))
                .approvedList(mapToResponse(issuesByStatus.get(IssueStatus.APPROVED)))
                .build();

    }

    public IssueDTO.ResponseList findPageByStatus(int projectId, IssueStatus status, int lastId, int pageSize) {
        return IssueDTO.ResponseList.builder()
                .responseList(
                        issueRepository.findTop5IssueByStatusAndProjectId(projectId, status, lastId, Pageable.ofSize(pageSize))
                                .stream()
                                .map(IssueDTO.Response::from)
                        .toList()
                )
                .build();
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

    /**
     * @author 이경태
     * @date 2024-05-07
     * @description 프로젝트 별 이슈 조회
     **/
    private List<Issue> findByProjectId(int projectId) {
        return issueRepository.findByProjectId(projectId)
                .orElseThrow(() -> new IssueException(ErrorCode.API_ERROR_ISSUE_NOT_FOUND));
    }

    private List<IssueDTO.Response> mapToResponse(List<Issue> issueList) {
        if(issueList == null) return new ArrayList<>();
        return issueList.stream()
                .map(IssueDTO.Response::from)
                .toList();
    }
}

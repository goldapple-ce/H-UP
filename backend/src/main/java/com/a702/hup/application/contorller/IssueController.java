package com.a702.hup.application.contorller;

import com.a702.hup.application.data.dto.IssueDTO;
import com.a702.hup.application.data.request.IssueSaveRequest;
import com.a702.hup.application.data.response.IssueDetailsResponse;
import com.a702.hup.application.facade.IssueFacade;
import com.a702.hup.domain.issue.IssueService;
import com.a702.hup.domain.issue.entity.IssueStatus;
import com.a702.hup.global.config.security.SecurityUserDetailsDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/issue")
public class IssueController {
    private final IssueService issueService;
    private final IssueFacade issueFacade;

    @PostMapping
    public ResponseEntity<Void> save(@AuthenticationPrincipal(errorOnInvalidType = true) SecurityUserDetailsDto user, @RequestBody @Valid IssueSaveRequest request){
        issueFacade.save(user.memberId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /**
     * @author 이경태
     * @date 2024-05-07
     * @description 팀 별 이슈 페이지네이션
     **/
    @GetMapping("/list/t/{teamId}")
    public ResponseEntity<IssueDTO.ResponseList> findIssuePageByTeamId(
            @PathVariable int teamId,
            @RequestParam int lastId,
            @RequestParam int pageSize
    ) {
        log.info("[+] IssueController :: findIssuePageByTeamId :: lastId : {}, size : {}", lastId, pageSize);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(issueService.findIssuePageByTeamId(teamId, lastId, pageSize));
    }

    @GetMapping("/list/p/{projectId}")
    public ResponseEntity<IssueDTO.ResponseList> findIssueByProjectId(
            @PathVariable int projectId,
            @RequestParam int lastId,
            @RequestParam int pageSize
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(issueService.findIssuePageByProjectId(projectId, lastId, pageSize));
    }

    /**
     * @author 이경태
     * @date 2024-05-07
     * @description 칸반 보드 초기 값 세팅(모든 상태 별 5개씩 로딩)
     **/
    @GetMapping("/kb/a/{projectId}")
    public ResponseEntity<IssueDTO.ResponseListByStatus> kanbanIssueInit(
            @PathVariable int projectId
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(issueService.findTop5IssueEachStatus(projectId));
    }

    /**
     * @author 이경태
     * @date 2024-05-07
     * @description 칸반 보드 상태 별 페이징 처리
     **/
    @GetMapping("/kb/s/{projectId}")
    public ResponseEntity<IssueDTO.ResponseList> kanbanIssueByStatus(
            @PathVariable int projectId,
            @RequestParam IssueStatus status,
            @RequestParam int lastId,
            @RequestParam int pageSize
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(issueService.findPageByStatus(projectId, status, lastId, pageSize));
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<IssueDetailsResponse> findIssueDetails(@PathVariable Integer issueId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(issueFacade.findIssueDetailsById(issueId));
    }

}

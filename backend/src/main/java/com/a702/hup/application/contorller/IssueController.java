package com.a702.hup.application.contorller;

import com.a702.hup.application.data.dto.IssueDTO;
import com.a702.hup.application.facade.IssueFacade;
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
    private final IssueFacade issueFacade;

    @PostMapping
    public ResponseEntity<IssueDTO.IssueInfo> save(
            @AuthenticationPrincipal(errorOnInvalidType = true) SecurityUserDetailsDto user,
            @RequestBody @Valid IssueDTO.Save request
    ){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(IssueDTO.IssueInfo.from(issueFacade.save(user.memberId(), request)));
    }

    @PostMapping("/update")
    public ResponseEntity<IssueDTO.IssueInfo> update(
            @AuthenticationPrincipal(errorOnInvalidType = true) SecurityUserDetailsDto user,
            @RequestBody @Valid IssueDTO.Update updateRequestDto
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(issueFacade.update(user.memberId(), updateRequestDto));
    }

    /**
     * @author 이경태
     * @date 2024-05-07
     * @description 프로젝트 별 이슈 조회
     **/
    @GetMapping("/list/{projectId}")
    public ResponseEntity<IssueDTO.IssueInfoList> findIssueByProjectId(
            @AuthenticationPrincipal(errorOnInvalidType = true) SecurityUserDetailsDto user,
            @PathVariable int projectId
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(issueFacade.findByProject(user.memberId(), projectId));
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<IssueDTO.IssueDetail> findIssueDetails(@PathVariable Integer issueId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(issueFacade.findIssueDetailsById(issueId));
    }
}

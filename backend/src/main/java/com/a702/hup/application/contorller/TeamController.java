package com.a702.hup.application.contorller;

import com.a702.hup.application.data.request.AddTeamMembersRequest;
import com.a702.hup.application.data.request.TeamSaveRequest;
import com.a702.hup.application.data.response.MemberInfoListResponse;
import com.a702.hup.application.facade.TeamFacade;
import com.a702.hup.global.config.security.SecurityUserDetailsDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/team")
public class TeamController {
    private final TeamFacade teamFacade;

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description 팀 생성 API
     **/
    @PostMapping
    public ResponseEntity<Void> saveTeam(@AuthenticationPrincipal SecurityUserDetailsDto user, @RequestBody TeamSaveRequest teamSaveRequest) {
        teamFacade.save(teamSaveRequest, user.memberId());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description 팀원 초대 API
     **/
    @PostMapping("/members")
    public ResponseEntity<Void> addMembers(@AuthenticationPrincipal SecurityUserDetailsDto user, @RequestBody AddTeamMembersRequest addTeamMembersRequest) {
        teamFacade.addMembers(user.memberId(), addTeamMembersRequest);
        return ResponseEntity
                .status(HttpStatus.OK)
                .build();
    }

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description 팀원 목록 조회 API
     **/
    @GetMapping("/members/{teamId}")
    public ResponseEntity<MemberInfoListResponse> findMemberList(@AuthenticationPrincipal SecurityUserDetailsDto user, @PathVariable int teamId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(teamFacade.findTeamMembers(user.memberId(), teamId));
    }
}

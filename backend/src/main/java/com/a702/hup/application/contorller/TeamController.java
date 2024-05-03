package com.a702.hup.application.contorller;

import com.a702.hup.application.data.request.AddTeamMembersRequest;
import com.a702.hup.application.data.request.TeamSaveRequest;
import com.a702.hup.application.facade.TeamFacade;
import com.a702.hup.domain.team.TeamService;
import com.a702.hup.global.config.security.SecurityUserDetailsDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/team")
public class TeamController {
    private final TeamService teamService;
    private final TeamFacade teamFacade;

    @PostMapping
    public ResponseEntity<Void> saveTeam(@AuthenticationPrincipal SecurityUserDetailsDto user, @RequestBody TeamSaveRequest teamSaveRequest) {
        teamFacade.save(teamSaveRequest, user.memberId());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addMembers(@AuthenticationPrincipal SecurityUserDetailsDto user, @RequestBody AddTeamMembersRequest addTeamMembersRequest) {
        teamFacade.addMembers(user.memberId(), addTeamMembersRequest);
        return ResponseEntity
                .status(HttpStatus.OK)
                .build();
    }
}

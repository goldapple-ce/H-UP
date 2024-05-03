package com.a702.hup.application.contorller;

import com.a702.hup.application.data.request.ProjectMemberSaveRequest;
import com.a702.hup.application.data.request.ProjectSaveRequest;
import com.a702.hup.application.facade.ProjectFacade;
import com.a702.hup.global.config.security.SecurityUserDetailsDto;
import jakarta.validation.Valid;
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
@RequestMapping("/project")
public class ProjectController {
    private final ProjectFacade projectFacade;

    @PostMapping
    public ResponseEntity<Void> save(@AuthenticationPrincipal(errorOnInvalidType = true) SecurityUserDetailsDto user, @Valid @RequestBody ProjectSaveRequest request){
        projectFacade.save(user.memberId(),request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/member")
    public ResponseEntity<Void> saveProjectMember(@AuthenticationPrincipal(errorOnInvalidType = true) SecurityUserDetailsDto user, @Valid @RequestBody ProjectMemberSaveRequest request){
        projectFacade.saveProjectMember(user.memberId(),request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

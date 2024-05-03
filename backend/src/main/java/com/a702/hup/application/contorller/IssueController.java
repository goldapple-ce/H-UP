package com.a702.hup.application.contorller;

import com.a702.hup.application.data.request.IssueSaveRequest;
import com.a702.hup.application.facade.IssueFacade;
import com.a702.hup.global.config.security.SecurityUserDetailsDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController("/issue")
public class IssueController {
    private final IssueFacade issueFacade;

    @PostMapping
    public ResponseEntity<Void> save(@AuthenticationPrincipal(errorOnInvalidType = true) SecurityUserDetailsDto user, @RequestBody @Valid IssueSaveRequest request){
        issueFacade.save(user.memberId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

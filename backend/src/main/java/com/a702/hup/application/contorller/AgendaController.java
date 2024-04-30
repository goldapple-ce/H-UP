package com.a702.hup.application.contorller;

import com.a702.hup.application.data.request.AgendaCreateRequest;
import com.a702.hup.application.facade.AgendaFacade;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/agenda")
public class AgendaController {
    private final AgendaFacade agendaFacade;

    /**
     * @author 강용민
     * @date 2024-04-29
     * @description 의사결정 저장
     */
    @PostMapping
    public ResponseEntity<Void> saveAgenda(@AuthenticationPrincipal(errorOnInvalidType = true) User user, @RequestBody @Valid AgendaCreateRequest request){
        agendaFacade.saveAgenda(user, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /**
     * @author 강용민
     * @date 2024-04-29
     * @description 의사결정 저장
     */
    @PostMapping("/assignee")
    public ResponseEntity<Void> saveAssignee(@AuthenticationPrincipal(errorOnInvalidType = true) User user, @RequestBody @Valid AgendaAssigneeSaveRequest request){
        agendaFacade.saveAgendaMember(user, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

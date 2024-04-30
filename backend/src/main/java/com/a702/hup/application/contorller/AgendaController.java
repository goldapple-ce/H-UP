package com.a702.hup.application.contorller;

import com.a702.hup.application.data.request.AgendaAssigneeSaveRequest;
import com.a702.hup.application.data.request.AgendaCreateRequest;
import com.a702.hup.application.data.request.AgendaUpdateRequest;
import com.a702.hup.application.facade.AgendaFacade;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

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
     * @description 의사결정 담당자 저장
     */
    @PostMapping("/assignee")
    public ResponseEntity<Void> saveAssignee(@AuthenticationPrincipal(errorOnInvalidType = true) User user, @RequestBody @Valid AgendaAssigneeSaveRequest request){
        agendaFacade.saveAssignee(user, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /**
     * @author 강용민
     * @date 2024-04-30
     * @description 의사결정 수정
     */
    @PutMapping
    public ResponseEntity<Void> updateAgenda(@AuthenticationPrincipal(errorOnInvalidType = true) User user, AgendaUpdateRequest request){
        agendaFacade.updateAgenda(user, request);
        return ResponseEntity.ok().build();
    }

    /**
     * @author 강용민
     * @date 2024-04-30
     * @description 의사결정 삭제
     */
    @DeleteMapping("/{agendaId}")
    public ResponseEntity<Void> deleteAgenda(@AuthenticationPrincipal(errorOnInvalidType = true) User user,@PathVariable(name = "agendaId") int agendaId){
        agendaFacade.deleteAgenda(user, agendaId);
        return ResponseEntity.ok().build();
    }

    /**
     * @author 강용민
     * @date 2024-
     * @description
     */
    @DeleteMapping("/assignee/{assigneeId}")
    public ResponseEntity<Void> deleteAssignee(@AuthenticationPrincipal(errorOnInvalidType = true) User user,@PathVariable(name = "assigneeId") int assigneeId){
        agendaFacade.deleteAssignee(user, assigneeId);
        return ResponseEntity.ok().build();
    }
}

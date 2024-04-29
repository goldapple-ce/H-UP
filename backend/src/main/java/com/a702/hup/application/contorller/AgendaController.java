package com.a702.hup.application.contorller;

import com.a702.hup.application.dto.request.AgendaCreateRequest;
import com.a702.hup.application.facade.AgendaFacade;
import com.a702.hup.domain.agenda.AgendaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController("/agenda")
public class AgendaController {
    private final AgendaFacade agendaFacade;
    private final AgendaService agendaService;

    @PostMapping
    public ResponseEntity<Void> saveAgenda(User user, @RequestBody @Valid AgendaCreateRequest request){
        agendaFacade.saveAgenda(user, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

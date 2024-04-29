package com.a702.hup.application.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AgendaAssigneeSaveRequest {
    @NotNull
    private int agendaId;

    @NotNull
    private int assigneeId;
}

package com.a702.hup.application.data.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AgendaUpdateRequest {
    @NotNull
    private Integer agendaId;

    @NotBlank
    private String content;
    @NotBlank
    private String status;
}

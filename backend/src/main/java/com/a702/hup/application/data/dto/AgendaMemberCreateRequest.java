package com.a702.hup.application.data.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AgendaMemberCreateRequest {
    @NotNull
    private Integer determinantId;

    @NotNull
    private Integer AgendaId;
}

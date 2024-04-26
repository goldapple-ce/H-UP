package com.a702.hup.domain.agenda.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AgendaStatus {
    ASSIGNED("ASSIGNED"),
    PROGRESS("PROGRESS"),
    COMPLETED("COMPLETED"),
    APPROVED("APPROVED"),
    ;

    private final String value;
}

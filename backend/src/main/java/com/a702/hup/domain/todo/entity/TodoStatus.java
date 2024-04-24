package com.a702.hup.domain.todo.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TodoStatus {
    ASSIGNED("CREATED"),
    PROGRESS("PROGRESS"),
    COMPLETED("COMPLETED"),
    APPROVED("APPROVED"),
    ;

    private final String value;
}
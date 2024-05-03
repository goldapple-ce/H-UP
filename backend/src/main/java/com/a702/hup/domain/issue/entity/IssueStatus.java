package com.a702.hup.domain.issue.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum IssueStatus {
    CREATED("CREATED"),
    SELECTED("SELECTED"),
    PROGRESS("PROGRESS"),
    COMPLETED("COMPLETED"),
    APPROVED("APPROVED"),
    ;

    private final String value;
}

package com.a702.hup.domain.notification.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NotificationType {
    ASSIGNED("ASSIGNED"),
    CHANGED("CHANGED"),
    MENTIONED("MENTIONED"),
    INVITED("INVITED"),
    ;

    private final String value;
}

package com.a702.hup.domain.project_member.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProjectMemberRole {
    OWNER("OWNER"),
    MAINTAINER("MAINTAINER"),
    DEVELOPER("DEVELOPER"),
    ;

    private final String value;
}

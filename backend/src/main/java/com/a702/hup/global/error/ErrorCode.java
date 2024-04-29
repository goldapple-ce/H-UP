package com.a702.hup.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // Global
    API_ERROR_INTERNAL_SERVER_ERROR(500, "G001", "서버 오류"),
    API_ERROR_INPUT_INVALID_VALUE(400, "G002", "잘못된 입력"),

    // Member
    API_ERROR_MEMBER_NOT_FOUND(400,"M001","멤버를 찾을 수 없음"),

    // Issue
    API_ERROR_ISSUE_NOT_FOUND(400,"I001","이슈를 찾을 수 없음"),
    API_ERROR_ISSUE_NOT_ROLE(400,"I002","해당 이슈에 대한 권한 없음"),

    // Agenda
    API_ERROR_AGENDA_NOT_FOUND(400,"A001","의사결정을 찾을 수 없음"),
    ;
    private final int status;
    private final String code;
    private final String message;
}

package com.a702.hup.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // Global
    API_ERROR_INTERNAL_SERVER_ERROR(500, "G001", "서버 오류"),
    API_ERROR_INPUT_INVALID_VALUE(400, "G002", "잘못된 입력"),
    ;
    private final int status;
    private final String code;
    private final String message;
}

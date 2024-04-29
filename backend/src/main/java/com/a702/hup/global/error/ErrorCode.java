package com.a702.hup.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // Global
    API_ERROR_INTERNAL_SERVER_ERROR(500, "G001", "서버 오류"),
    API_ERROR_INPUT_INVALID_VALUE(400, "G002", "잘못된 입력"),

    // Auth
    API_ERROR_USERNAME_NOT_FOUND(400, "AUTH001", "아이디 입력 오류"),
    API_ERROR_AUTHENTICATION_FAIL(401, "AUTH002", "인증 실패"),
    API_ERROR_TOKEN_NOT_FOUND(400, "AUTH003", "토큰이 없음"),
    API_ERROR_TOKEN_EXPIRED(400, "AUTH004", "만료된 토큰"),
    API_ERROR_IS_MALFORMED_TOKEN(400, "AUTH005", "잘못된 형식의 토큰"),
    API_ERROR_UNAUTHORIZED(403, "AUTH006", "권한 없음"),

    // Member
    API_ERROR_MEMBER_NOT_FOUND(400, "M001", "존재하지 않는 멤버"),
    API_ERROR_IS_DELETED_MEMBER(400, "M002", "탈퇴된 계정"),
    ;
    private final int status;
    private final String code;
    private final String message;
}

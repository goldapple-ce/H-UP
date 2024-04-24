package com.a702.hup.global.error.exception;

import com.a702.hup.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public static BusinessException of(ErrorCode errorCode){
        return new BusinessException(errorCode);
    }
}

package com.a702.hup.domain.todo;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;

public class TodoException extends BusinessException {
    public TodoException(ErrorCode errorCode) {
        super(errorCode);
    }
}

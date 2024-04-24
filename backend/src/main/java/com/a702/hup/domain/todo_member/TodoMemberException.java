package com.a702.hup.domain.todo_member;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;

public class TodoMemberException extends BusinessException {
    public TodoMemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}

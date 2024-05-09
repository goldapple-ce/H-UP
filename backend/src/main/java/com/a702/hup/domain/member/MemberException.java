package com.a702.hup.domain.member;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;

public class MemberException extends BusinessException {
    public MemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}

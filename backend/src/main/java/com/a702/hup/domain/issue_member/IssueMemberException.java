package com.a702.hup.domain.issue_member;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;

public class IssueMemberException extends BusinessException {
    public IssueMemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}

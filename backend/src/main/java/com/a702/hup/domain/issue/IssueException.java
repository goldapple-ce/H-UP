package com.a702.hup.domain.issue;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;

public class IssueException extends BusinessException {
    public IssueException(ErrorCode errorCode) {
        super(errorCode);
    }
}

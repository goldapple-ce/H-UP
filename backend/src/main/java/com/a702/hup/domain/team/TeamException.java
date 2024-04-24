package com.a702.hup.domain.team;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;

public class TeamException extends BusinessException {
    public TeamException(ErrorCode errorCode) {
        super(errorCode);
    }
}

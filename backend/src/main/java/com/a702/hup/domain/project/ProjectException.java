package com.a702.hup.domain.project;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;

public class ProjectException extends BusinessException {
    public ProjectException(ErrorCode errorCode) {
        super(errorCode);
    }
}

package com.a702.hup.domain.project_member;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;

public class ProjectMemberException extends BusinessException {
    public ProjectMemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}

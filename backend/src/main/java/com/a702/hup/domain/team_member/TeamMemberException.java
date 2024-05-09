package com.a702.hup.domain.team_member;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;

public class TeamMemberException extends BusinessException {
    public TeamMemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}

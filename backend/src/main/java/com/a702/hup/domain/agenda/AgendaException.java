package com.a702.hup.domain.agenda;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;

public class AgendaException extends BusinessException {
    public AgendaException(ErrorCode errorCode) {
        super(errorCode);
    }
}

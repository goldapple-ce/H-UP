package com.a702.hup.application.exception;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;

public class AgendaFacadeException extends BusinessException {
    public AgendaFacadeException(ErrorCode errorCode) {
        super(errorCode);
    }
}

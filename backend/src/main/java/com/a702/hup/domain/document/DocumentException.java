package com.a702.hup.domain.document;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;

public class DocumentException extends BusinessException {
    public DocumentException(ErrorCode errorCode) {
        super(errorCode);
    }
}

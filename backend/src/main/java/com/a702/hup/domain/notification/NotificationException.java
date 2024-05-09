package com.a702.hup.domain.notification;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;

public class NotificationException extends BusinessException {
    public NotificationException(ErrorCode errorCode) {
        super(errorCode);
    }
}

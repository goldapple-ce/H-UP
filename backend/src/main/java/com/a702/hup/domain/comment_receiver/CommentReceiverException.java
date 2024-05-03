package com.a702.hup.domain.comment_receiver;

import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;

public class CommentReceiverException extends BusinessException {
    public CommentReceiverException(ErrorCode errorCode) {
        super(errorCode);
    }
}

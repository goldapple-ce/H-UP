package com.a702.hup.global.error;

import com.a702.hup.global.error.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.a702.hup.global.error.ErrorCode.API_ERROR_INPUT_INVALID_VALUE;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    protected ResponseEntity<ErrorResponse> handleRuntimeException(BusinessException e) {
        final ErrorCode errorCode = e.getErrorCode();
        final ErrorResponse response =
                ErrorResponse.builder()
                        .errorMessage(errorCode.getMessage())
                        .businessCode(errorCode.getCode())
                        .build();
        log.warn(e.getMessage());
        return ResponseEntity.status(errorCode.getStatus()).body(response);
    }

    @ExceptionHandler
    protected ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        final ErrorResponse response = ErrorResponse.of(API_ERROR_INPUT_INVALID_VALUE, e.getBindingResult());
        log.warn(e.getMessage());
        return ResponseEntity.status(API_ERROR_INPUT_INVALID_VALUE.getStatus()).body(response);
    }
}

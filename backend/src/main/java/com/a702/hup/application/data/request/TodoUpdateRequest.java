package com.a702.hup.application.data.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TodoUpdateRequest {
    @NotNull
    private Integer todoId;
    @NotBlank
    private String content;
    @NotBlank
    private String todoStatus;
}

package com.a702.hup.application.data.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TodoAssigneeSaveRequest {
    @NotNull
    private Integer todoId;
    @NotNull
    private Integer memberId;
}

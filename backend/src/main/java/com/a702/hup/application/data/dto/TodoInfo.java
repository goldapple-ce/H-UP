package com.a702.hup.application.data.dto;

import com.a702.hup.domain.todo.entity.Todo;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TodoInfo {
    @NotNull
    private Integer todoId;
    private String content;
    @NotNull
    private String status;

    public static TodoInfo of(Todo todo) {
        return TodoInfo.builder()
                .todoId(todo.getId())
                .content(todo.getContent())
                .status(String.valueOf(todo.getStatus())).build();
    }
}

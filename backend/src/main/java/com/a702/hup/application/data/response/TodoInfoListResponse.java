package com.a702.hup.application.data.response;

import com.a702.hup.application.data.dto.TodoInfo;
import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class TodoInfoListResponse {
    List<TodoInfo> todoInfoList;

    public static TodoInfoListResponse toResponse(List<TodoInfo> todoInfoList) {
        return TodoInfoListResponse.builder().todoInfoList(todoInfoList).build();
    }
}

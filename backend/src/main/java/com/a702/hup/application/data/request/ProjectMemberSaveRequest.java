package com.a702.hup.application.data.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ProjectMemberSaveRequest {

    @NotNull
    private int projectId;

    @NotEmpty
    private List<Integer> memberList;
}

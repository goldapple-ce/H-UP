package com.a702.hup.application.data.response;

import com.a702.hup.application.data.dto.MemberInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ProjectMembersResponse {
    private List<MemberInfo> memberInfoList;

    public static ProjectMembersResponse from(List<MemberInfo> memberInfoList) {
        return new ProjectMembersResponse(memberInfoList);
    }
}

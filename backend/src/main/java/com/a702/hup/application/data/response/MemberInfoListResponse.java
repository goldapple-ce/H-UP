package com.a702.hup.application.data.response;

import com.a702.hup.application.data.dto.MemberInfo;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class MemberInfoListResponse {
    private List<MemberInfo> memberInfoList;

    @Builder
    public MemberInfoListResponse(List<MemberInfo> memberInfoList) {
        this.memberInfoList = memberInfoList;
    }
}

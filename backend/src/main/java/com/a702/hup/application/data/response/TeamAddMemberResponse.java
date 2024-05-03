package com.a702.hup.application.data.response;

import com.a702.hup.application.data.dto.MemberInfo;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TeamAddMemberResponse {
    private List<MemberInfo> failToAdd;

    @Builder
    public TeamAddMemberResponse(List<MemberInfo> failToAdd) {
        this.failToAdd = failToAdd;
    }
}

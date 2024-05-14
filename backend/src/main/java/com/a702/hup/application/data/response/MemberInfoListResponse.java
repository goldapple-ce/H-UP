package com.a702.hup.application.data.response;

import com.a702.hup.application.data.dto.MemberInfo;
import com.a702.hup.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class MemberInfoListResponse {
    private List<MemberInfo> memberInfoList;

    @Builder
    public MemberInfoListResponse(List<MemberInfo> memberInfoList) {
        this.memberInfoList = memberInfoList;
    }

    public static MemberInfoListResponse from(List<Member> memberList){
        List<MemberInfo> memberInfoList = new ArrayList<>();

        for(Member member : memberList){
            memberInfoList.add(MemberInfo.from(member));
        }
        return new MemberInfoListResponse(memberInfoList);
    }
}

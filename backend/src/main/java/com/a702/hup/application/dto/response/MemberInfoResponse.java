package com.a702.hup.application.dto.response;

import com.a702.hup.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberInfoResponse {
    private Integer id;
    private String name;
    private String img;

    public static MemberInfoResponse from(Member member) {
        return new MemberInfoResponse(member.getId(), member.getName(), member.getImg());
    }
}

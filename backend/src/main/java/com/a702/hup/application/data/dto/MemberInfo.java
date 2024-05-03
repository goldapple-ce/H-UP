package com.a702.hup.application.data.dto;

import com.a702.hup.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberInfo {
    private Integer id;
    private String name;
    private String img;

    public static MemberInfo from(Member member) {
        return new MemberInfo(member.getId(), member.getName(), member.getImg());
    }
}

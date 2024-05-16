package com.a702.hup.application.data.dto;

import com.a702.hup.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

public class MemberDTO {
    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class MemberInfo {
        private Integer id;
        private String name;
        private String img;

        public static MemberInfo from(Member member) {
            return new MemberInfo(member.getId(), member.getName(), member.getImg());
        }


    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class MemberInfoList {
        private List<MemberInfo> memberInfoList;

        public static MemberInfoList from(List<MemberInfo> memberInfoList) {
            return new MemberInfoList(memberInfoList);
        }
    }
}

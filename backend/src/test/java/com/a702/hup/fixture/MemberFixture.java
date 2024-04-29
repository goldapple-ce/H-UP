package com.a702.hup.fixture;

import com.a702.hup.domain.member.entity.Member;

public enum MemberFixture {
    MEMBER_FIXTURE("허브", "hup", "hupPw", "hupImg");
    private String name;
    private String userId;
    private String password;
    private String img;

    MemberFixture(String name, String userId, String password, String img) {
        this.name = name;
        this.userId = userId;
        this.password = password;
        this.img = img;
    }

    public Member create() {
        return Member.builder()
                .userId(this.userId)
                .name(this.name)
                .password(this.password)
                .img(this.img)
                .build();
    }
}

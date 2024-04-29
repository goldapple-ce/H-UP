package com.a702.hup.application.data.dto;

import com.a702.hup.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberSignUpRequest {
    private String userId;
    private String password;
    private String name;

    public Member toEntity(String encodedPassword) {
        return Member.builder()
                .name(this.name)
                .userId(this.userId)
                .password(encodedPassword)
                .build();
    }
}

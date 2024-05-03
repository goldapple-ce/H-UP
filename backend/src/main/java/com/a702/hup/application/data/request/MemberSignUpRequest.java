package com.a702.hup.application.data.request;

import com.a702.hup.domain.member.entity.Member;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberSignUpRequest {
    @NotBlank
    private String userId;
    @NotBlank
    private String password;
    @NotBlank
    private String name;

    public Member toEntity(String encodedPassword) {
        return Member.builder()
                .name(this.name)
                .userId(this.userId)
                .password(encodedPassword)
                .build();
    }
}

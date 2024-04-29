package com.a702.hup.application.data.response;

import com.a702.hup.global.config.security.jwt.JwtToken;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberLoginResponse {
    private Integer memberId;
    private JwtToken jwtToken;

    @Builder
    public MemberLoginResponse(Integer memberId, JwtToken jwtToken) {
        this.memberId = memberId;
        this.jwtToken = jwtToken;
    }
}

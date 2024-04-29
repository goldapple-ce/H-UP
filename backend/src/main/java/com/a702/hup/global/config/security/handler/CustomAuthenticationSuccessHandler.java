package com.a702.hup.global.config.security.handler;

import com.a702.hup.global.config.security.MemberDto;
import com.a702.hup.global.config.security.SecurityUserDetailsDto;
import com.a702.hup.global.config.security.jwt.JwtToken;
import com.a702.hup.global.config.security.jwt.TokenProvider;
import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class CustomAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final ObjectMapper objectMapper;
    private final TokenProvider tokenProvider;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws ServletException, IOException {
        log.debug("[+] CustomAuthenticationSuccessHandler :: onAuthenticationSuccess");

        // 사용자 정보 조회
        MemberDto memberDto = ((SecurityUserDetailsDto) authentication.getPrincipal()).getMemberDto();

        // 비활성화 계정인 경우
        if(memberDto.deletedAt() != null)
            throw new BusinessException(ErrorCode.API_ERROR_IS_DELETED_MEMBER);

        // 활성화 계정인 경우
        JwtToken token = tokenProvider.createToken(authentication);
        log.debug("[+] CustomAuthenticationSuccessHandler :: onAuthenticationSuccess :: generated Token : {}", token);
        response.addHeader("Authorization", token.accessToken());
    }
}

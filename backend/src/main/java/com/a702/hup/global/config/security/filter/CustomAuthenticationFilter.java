package com.a702.hup.global.config.security.filter;

import com.a702.hup.application.data.request.MemberLoginRequest;
import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

@Slf4j
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final ObjectMapper objectMapper;

    public CustomAuthenticationFilter(
            AuthenticationManager authenticationManager,
            ObjectMapper objectMapper
    ) {
        super(authenticationManager);
        this.objectMapper = objectMapper;
    }

    /**
     * @author 이경태
     * @date 2024-04-26
     * @description 로그인 시 호출되는 메소드
     * @return Authentication  성공 시 인증 객체 반환
     * @exception AuthenticationException
     **/
    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws AuthenticationException {
        log.debug("[+] CustomAuthenticationFilter :: attemptAuthentication :: start");
        UsernamePasswordAuthenticationToken authRequest;

        // get authToken
        log.debug("[+] CustomAuthenticationFilter :: attemptAuthentication :: get authToken before authentication");
        authRequest = getAuthRequest(request);
        setDetails(request, authRequest);

        // 인증 후 userDetailsService를 활용해 userDetails를 등록한다.
        log.debug("[+] CustomAuthenticationFilter :: attemptAuthentication :: start authentication");
        Authentication authentication = this.getAuthenticationManager().authenticate(authRequest);
        log.debug("[+] CustomAuthenticationFilter :: attemptAuthentication :: authenticate complete !!");
        log.debug("[+] CustomAuthenticationFilter :: attemptAuthentication :: authentication credentials : {}", authentication.getCredentials());

        // 인증된 정보 반환
        return authentication;
    }

    /**
     * @author 이경태
     * @date 2024-04-26
     * @description login request로부터 UsernamePasswordAuthenticationToken을 생성하는 함수
     *
     * @param request HttpServletRequest
     * @return UsernamePasswordAuthenticationToken
     * @exception IOException request.getInpustStream에서 입력이 잘못됐을 때
     * @exception UsernameNotFoundException 아이디 미입력 시 오류
     **/
    private UsernamePasswordAuthenticationToken getAuthRequest(
            HttpServletRequest request
    ) {
        MemberLoginRequest loginRequest = null;
        try {
            loginRequest = objectMapper.readValue(request.getInputStream(), MemberLoginRequest.class);
            log.debug("[+] CustomAuthenticationFilter :: getAuthRequest :: loginId : {}, loginPw : {}", loginRequest.getUserId(), loginRequest.getPassword());
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.API_ERROR_INPUT_INVALID_VALUE);
        } catch (UsernameNotFoundException e) {
            throw new BusinessException(ErrorCode.API_ERROR_USERNAME_NOT_FOUND);
        }

        // ID, password 로 미인증 AuthenticationToken 생성
        return new UsernamePasswordAuthenticationToken(loginRequest.getUserId(), loginRequest.getPassword());
    }
}

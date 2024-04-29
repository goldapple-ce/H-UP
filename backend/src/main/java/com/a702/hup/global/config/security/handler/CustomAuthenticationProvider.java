package com.a702.hup.global.config.security.handler;

import com.a702.hup.global.config.security.SecurityUserDetailsDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Slf4j
@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        log.debug("[+] CustomAuthenticationProvider :: authenticate :: start");
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) authentication;

        // AuthenticationFilter에서 생성된 토큰으로 ID, PW 조회
        String userId = token.getName();
        String password = (String) token.getCredentials();
        log.debug("[+] CustomAuthenticationProvider :: authenticate :: userId : {}, password : {}", userId, password);

        // Spring Security - userDetailsService를 통해 DB에서 사용자 조회
        SecurityUserDetailsDto securityUserDetailsDto = (SecurityUserDetailsDto) userDetailsService.loadUserByUsername(userId);
        log.debug("[+] CustomAuthenticationProvider :: authenticate :: member's name who try to login : {}", securityUserDetailsDto.getMemberDto().name());

        // 비밀번호 확인
        log.debug("[+] CustomAuthenticationProvider :: authenticate :: password checking start");
        if(!passwordEncoder.matches(password, securityUserDetailsDto.getPassword()))
            throw new BadCredentialsException(securityUserDetailsDto.getUsername() + " invalid password");

        // 성공 시
        log.debug("[+] CustomAuthenticationProvider :: authenticate :: end");
        return new UsernamePasswordAuthenticationToken(securityUserDetailsDto, password, securityUserDetailsDto.getAuthorities());
    }

    /**
     * @author 이경태
     * @date 2024-04-26
     * @description AuthenticationProvider가 들어온 authentication 타입을 지원하는지 판별하는 함수
     **/
    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}

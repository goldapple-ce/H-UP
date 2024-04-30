package com.a702.hup.global.config.security.filter;

import com.a702.hup.application.data.request.MemberLoginRequest;
import com.a702.hup.global.config.security.jwt.TokenProvider;
import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER_TOKEN_PREFIX = "Bearer ";

    private final TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        log.debug("[+] JwtAuthorizationFilter :: doFilterInternal :: start");
        log.debug("[+] JwtAuthorizationFilter :: doFilterInternal :: requestURI : {}", request.getRequestURI());
        log.debug("[+] JwtAuthorizationFilter :: doFilterInternal :: requestMethod : {}", request.getMethod());

        // token 검증 제외 api path
        List<String> apiList = Arrays.asList(
                "/api/swagger-ui"
        );

        // 제외 api인지 확인
        for(String api : apiList) {
            if(request.getRequestURI().startsWith(api)) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        // METHOD == OPTIONS 바로 넘김
        if(request.getMethod().equalsIgnoreCase("OPTIONS")) {
            filterChain.doFilter(request, response);
            return;
        }
        log.debug("[+] JwtAuthorizationFilter :: doFilterInternal :: this api need token");

        // header에 토큰 있는지 확인. 없으면 에러
        String token = resolveToken(request);
        log.debug("[+] JwtAuthorizationFilter :: doFilterInternal :: resolved token => {}", token);

        // token 유효성 검증
        if(tokenProvider.validateToken(token)) {
            String userId = tokenProvider.extractUsername(token);
            log.debug("[+] JwtAuthorizationFilter :: doFilterInternal :: userId = {}", userId);

            if(userId != null && !userId.isEmpty()) {
                Authentication authentication = tokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                filterChain.doFilter(request, response);
            } else {
                throw new BusinessException(ErrorCode.API_ERROR_MEMBER_NOT_FOUND);
            }
        } else {
            throw new BusinessException(ErrorCode.API_ERROR_IS_MALFORMED_TOKEN);
        }
    }

    /**
     * @author 이경태
     * @date 2024-04-26
     * @description request header 속에 있는 token 추출 함수
     **/
    private String resolveToken(HttpServletRequest request) {
        log.debug("[+] JwtAuthorizationFilter :: resolveToken :: start");

        // get token from header
        String bearerToken = request.getHeader(AUTHORIZATION);
        log.info("[+] JwtAuthorizationFilter :: resolveToken :: bearerToken : {}", bearerToken);

        // check is Bearer Token & is not null
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_TOKEN_PREFIX))
            return bearerToken.substring(7);

        return null;
    }

    /**
     * @author 이경태
     * @date 2024-04-25
     * @description request body를 dto로 변환시켜주는 함수
     * @deprecated
     **/
    @Deprecated(forRemoval = true)
    private MemberLoginRequest convertToLoginRequest(HttpServletRequest request) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(request.getInputStream(), MemberLoginRequest.class);
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.API_ERROR_INPUT_INVALID_VALUE);
        }
    }
}

package com.a702.hup.global.config;

import com.a702.hup.global.config.security.CustomUserDetailsService;
import com.a702.hup.global.config.security.filter.CustomAuthenticationFilter;
import com.a702.hup.global.config.security.filter.JwtAuthorizationFilter;
import com.a702.hup.global.config.security.handler.CustomAuthenticationProvider;
import com.a702.hup.global.config.security.handler.CustomAuthenticationSuccessHandler;
import com.a702.hup.global.config.security.handler.CustomAuthenticationUnsuccessHandler;
import com.a702.hup.global.config.security.jwt.TokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;

@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private static final String HOME = "/";
    private static final String SIGNUP = "/member";
    private static final String LOGIN_URL = "/member/login";
    private static final String ERROR = "/error";
    /**
     * @author 이경태
     * @date 2024-04-26
     * @description Security Filter
     **/
    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity httpSecurity,
            CustomAuthenticationFilter customAuthenticationFilter,
            JwtAuthorizationFilter jwtAuthorizationFilter
    ) throws Exception {
        log.debug("[+] WebSecurityConfig Start");
        return httpSecurity
                // JWT 사용 시 기본 인증 비활성화
                .httpBasic(HttpBasicConfigurer::disable)
                // cors disable
                .cors(corsConfigurer -> corsConfigurer.configurationSource(corsConfigurationSource()))
                // token 사용하니까 csrf disable
                .csrf(AbstractHttpConfigurer::disable)
                // 세션 관리 정책 STATELESS -> 세션 없이 상태 유지 정책
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // formLogin disable
                .formLogin(AbstractHttpConfigurer::disable)
                // 인가 처리 요청 구분
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                HOME,
                                SIGNUP,
                                LOGIN_URL,
                                ERROR).permitAll()
                        .anyRequest().authenticated()
                )
                // filter 추가
                .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(customAuthenticationFilter, JwtAuthorizationFilter.class)

                // 인증 / 인가 과정 중의 에러를 처리
//                .exceptionHandling(exceptions -> exceptions
//                        .authenticationEntryPoint()
//                        .accessDeniedHandler()
//                )
                .build();
    }

    /**
     * @author 이경태
     * @since 2024-04-26
     * @description Cors 관련 설정
     **/
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedHeaders(Collections.singletonList("*"));
        config.setAllowedMethods(Collections.singletonList("*"));
        config.setAllowedOriginPatterns(Collections.singletonList("**"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public CustomAuthenticationFilter customAuthenticationFilter(
            AuthenticationManager authenticationManager,
            CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler,
            CustomAuthenticationUnsuccessHandler customAuthenticationUnsuccessHandler,
            ObjectMapper objectMapper
    ) {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager, objectMapper);

        // login url 설정
        customAuthenticationFilter.setFilterProcessesUrl(LOGIN_URL);
        // 성공 시 핸들러 설정
        customAuthenticationFilter.setAuthenticationSuccessHandler(customAuthenticationSuccessHandler);
        // 인증 실패 시 핸들러 설정
        customAuthenticationFilter.setAuthenticationFailureHandler(customAuthenticationUnsuccessHandler);
        customAuthenticationFilter.afterPropertiesSet();

        return customAuthenticationFilter;
    }

    /**
     * @author 이경태
     * @date 2024-04-27
     * @description CustomAuthenticationFilter -> AuthenticationManager(interface) -> CustomAuthenticationProvider(impl) 과정에서의 인증 매니저
     **/
    @Bean
    public AuthenticationManager authenticationManager(CustomAuthenticationProvider customAuthenticationProvider) {
        return new ProviderManager(Collections.singletonList(customAuthenticationProvider));
    }

    /**
     * @author 이경태
     * @date 2024-04-27
     * @description CustomAuthenticationFilter -> AuthenticationManager -> CustomAuthenticationProvider
     * @apiNote 사용자 이름, 비밀 번호 기반으로 인증 정보를 제공한다.
     **/
    @Bean
    public CustomAuthenticationProvider customAuthenticationProvider(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder
    ) {
        return new CustomAuthenticationProvider(
                userDetailsService,
                passwordEncoder
        );
    }

    /**
     * @author 이경태
     * @date 2024-04-28
     * @description 인증 성공 시 인증 정보를 리턴해주는 핸들러
     **/
    @Bean
    public CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler(
            ObjectMapper objectMapper,
            TokenProvider tokenProvider
    ) {
        return new CustomAuthenticationSuccessHandler(objectMapper, tokenProvider);
    }

    /**
     * @author 이경태
     * @date 2024-04-28
     * @description 인증 실패 시 예외 처리 핸들러
     **/
    @Bean
    public CustomAuthenticationUnsuccessHandler customAuthenticationUnsuccessHandler() {
        return new CustomAuthenticationUnsuccessHandler();
    }

    /**
     * @author 이경태
     * @date 2024-04-28
     * @description JWT 기반 사용자 인증 필터. 헤더의 토큰 검증 후 유효하면 사용자 정보를 SecurityContext에 저장
     **/
    @Bean
    public JwtAuthorizationFilter jwtAuthorizationFilter(
            CustomUserDetailsService userDetailsService,
            TokenProvider tokenProvider
    ) {
        return new JwtAuthorizationFilter(userDetailsService, tokenProvider);
    }
}



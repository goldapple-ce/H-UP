package com.a702.hup.application.contorller;

import com.a702.hup.domain.auth.redis.TokenService;
import com.a702.hup.global.config.security.jwt.JwtToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final TokenService tokenService;

    @PostMapping("/refresh")
    public ResponseEntity<JwtToken> refresh(@RequestHeader("refreshToken") String token) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tokenService.refresh(token.substring(7)));
    }
}

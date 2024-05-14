package com.a702.hup.domain.auth.redis;

import com.a702.hup.global.config.security.jwt.JwtToken;
import com.a702.hup.global.config.security.jwt.TokenProvider;
import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TokenService {
    private final TokenRepository tokenRepository;
    private final TokenProvider tokenProvider;

    /**
     * @author 이경태
     * @date 2024-05-13
     * @description 토큰 재발급
     **/
    public JwtToken refresh(String refreshToken) {
        // 인증 정보
        Authentication authentication = tokenProvider.getAuthentication(refreshToken);

        // token 정보 추출
        String userId = authentication.getName();
        String oldToken = this.findById(userId);

        // TOKEN 동일한지 확인
        if(!refreshToken.equals(oldToken)) {
            throw new BusinessException(ErrorCode.API_ERROR_ACCESS_TOKEN_EXPIRED);
        }

        // 새로 발급
        JwtToken newToken = tokenProvider.createToken(authentication);

        // 갱신
        save(userId, newToken);

        // 갱신된 거 발급
        return newToken;
    }

    public void save(String userId, JwtToken token) {
        tokenRepository.save(Token.builder()
                .id(userId)
                .refreshToken(token.refreshToken())
                .build());
    }

    /**
     * @author 이경태
     * @date 2024-05-13
     * @description id로 token 반환
     **/
    private String findById(String userId) {
        return tokenRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.API_ERROR_TOKEN_NOT_FOUND))
                .getRefreshToken();
    }
}

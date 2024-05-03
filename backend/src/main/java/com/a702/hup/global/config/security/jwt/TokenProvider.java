package com.a702.hup.global.config.security.jwt;

import com.a702.hup.global.config.security.CustomUserDetailsService;
import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.error.exception.BusinessException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Slf4j
@Component
public class TokenProvider {
    // for payload
    private static final String TOKEN_TYPE = "token_type";
    private static final String TYPE_ACCESS = "access";
    private static final String TYPE_REFRESH = "refresh";
    private static final String ISSUER = "h-up";

    // signed key
    private SecretKey SECRET_KEY;

    // ExpiredTime
    @Value("${jwt.expiration.access}")
    private long ACCESS_EXPIRATION;
    @Value("${jwt.expiration.refresh}")
    private long REFRESH_EXPIRATION;

    private final CustomUserDetailsService customUserDetailsService;

    /**
     * @author 이경태
     * @date 2024-04-25
     * @description 키 생성
     **/
    public TokenProvider(@Value("${jwt.secret}") String secret, CustomUserDetailsService customUserDetailsService) {
        this.SECRET_KEY = Keys.hmacShaKeyFor(secret.getBytes());
        this.customUserDetailsService = customUserDetailsService;
    }

    /**
     * @author 이경태
     * @date 2024-04-25
     * @description JwtToken 생성
     **/
    public JwtToken createToken(Authentication authentication) {
        String accessToken = generateToken(authentication.getName(), TYPE_ACCESS, ACCESS_EXPIRATION * 1000L);
        String refreshToken = generateToken(authentication.getName(), TYPE_REFRESH, REFRESH_EXPIRATION * 1000);

        log.debug("[+] TokenProvider :: createToken :: token generation success !!");
        return new JwtToken(accessToken, refreshToken);
    }

    /**
     * @author 이경태
     * @date 2024-04-27
     * @description extract userId from token
     **/
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean validateToken(String token) {
        Claims claims = extractAllClaims(token);

        if(!claims.getIssuer().equals(ISSUER)
        || !claims.get(TOKEN_TYPE).equals(TYPE_ACCESS))
            throw new BusinessException(ErrorCode.API_ERROR_IS_MALFORMED_TOKEN);

        return true;
    }

    /**
     * @author 이경태
     * @date 2024-04-25
     * @description
     **/
    public Authentication getAuthentication(String token) {
        Claims claims = extractAllClaims(token);
        UserDetails principal = customUserDetailsService.loadUserByUsername(claims.getSubject());
        return new UsernamePasswordAuthenticationToken(principal, token, principal.getAuthorities());
    }


    /**
     * @author 이경태
     * @date 2024-04-27
     * @description extract specific claim from claims of token by Claims method
     **/
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * @author 이경태
     * @date 2024-04-27
     * @description get claims from token
     **/
    private Claims extractAllClaims(String token) {
        Claims claims = null;
        try {
            claims = Jwts.parser()
                    .verifyWith(SECRET_KEY)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (JwtException e) {
            throw new BusinessException(ErrorCode.API_ERROR_IS_MALFORMED_TOKEN);
        } catch (IllegalArgumentException e) {
            throw new BusinessException(ErrorCode.API_ERROR_TOKEN_NOT_FOUND);
        }

        return claims;
    }

    /**
     * @author 이경태
     * @date 2024-04-27
     * @description check if token is expired
     * @deprecated
     **/
    @Deprecated(forRemoval = true)
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * @author 이경태
     * @date 2024-04-27
     * @description extract Expiration from token
     * @deprecated
     **/
    @Deprecated(forRemoval = true)
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * @author 이경태
     * @date 2024-04-27
     * @description type에 따른 token 발급
     **/
    private String generateToken(String userId, String tokenType, long duration) {
        return Jwts.builder()
                // payload
                .claims(createClaims())
                .subject(userId)
                .expiration(createExpiration(duration))
                .claim(TOKEN_TYPE, tokenType)
                // signature
                .signWith(SECRET_KEY)
                .compact();
    }

    /**
     * @author 이경태
     * @date 2024-04-26
     * @description duration 기반 만료 시간 생성 함수
     **/
    private Date createExpiration(long duration) {
        return new Date(System.currentTimeMillis() + duration);
    }

    /**
     * @author 이경태
     * @date 2024-04-27
     * @description 공통 claim 생성(issuer, issuedAt)
     **/
    private Claims createClaims() {
        return Jwts.claims()
                .issuer(ISSUER)
                .issuedAt(new Date(System.currentTimeMillis()))
                .build();
    }
}

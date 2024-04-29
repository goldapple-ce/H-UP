package com.a702.hup.domain.member;

import com.a702.hup.application.dto.request.MemberSignUpRequest;
import com.a702.hup.application.dto.response.IdCheckResponse;
import com.a702.hup.application.dto.response.MemberInfoResponse;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.global.config.security.SecurityUserDetailsDto;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * @author 이경태
     * @date 2024-04-28
     * @description 회원 가입 시 사용되는 save 함수
     **/
    @Transactional
    public void signUp(MemberSignUpRequest memberSignUpRequest) {
        save(memberSignUpRequest
                .toEntity(passwordEncoder.encode(memberSignUpRequest.getPassword())));
    }

    /**
     * @author 이경태
     * @date 2024-04-29
     * @description 멤버 정보 반환 함수
     **/
    public MemberInfoResponse findMemberInfoById(Integer id) {
        if(!isAuthorized(id))
            throw new MemberException(ErrorCode.API_ERROR_UNAUTHORIZED);
        return MemberInfoResponse.from(findById(id));
    }

    public IdCheckResponse idCheck(String userId) {
        return IdCheckResponse.builder()
                .isAvailable(!memberRepository.existsByUserIdAndDeletedAtIsNull(userId))
                .build();
    }

    /**
     * @author 이경태
     * @date 2024-04-25
     * @description userId를 통한 Member 검색 함수
     **/
    public Member findByUserId(String userId) {
        return memberRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(() -> new MemberException(ErrorCode.API_ERROR_MEMBER_NOT_FOUND));
    }

    /**
     * @author 이경태
     * @date 2024-04-28
     * @description repository save
     **/
    private void save(Member member) {
        memberRepository.save(member);
    }

    /**
     * @author 이경태
     * @date 2024-04-29
     * @description Id로 member 찾는 함수
     **/
    private Member findById(Integer id) {
        return memberRepository.findById(id)
            .orElseThrow(() -> new MemberException(ErrorCode.API_ERROR_MEMBER_NOT_FOUND));
    }

    private boolean isAuthorized(Integer memberId) {
        SecurityUserDetailsDto securityUserDetailsDto = (SecurityUserDetailsDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("[+] MemberService :: findMemberInfoById :: requested Id : {}, logined Id : {}", memberId, securityUserDetailsDto.memberId());
        return memberId.equals(securityUserDetailsDto.memberId());
    }
}

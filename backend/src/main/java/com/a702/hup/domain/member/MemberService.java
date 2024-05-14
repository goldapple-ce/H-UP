package com.a702.hup.domain.member;

import com.a702.hup.application.data.dto.MemberInfo;
import com.a702.hup.application.data.request.MemberSignUpRequest;
import com.a702.hup.application.data.response.IdCheckResponse;
import com.a702.hup.application.data.response.UpdateProfileImgResponse;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.global.config.security.SecurityUserDetailsDto;
import com.a702.hup.global.error.ErrorCode;
import com.a702.hup.global.util.ImageType;
import com.a702.hup.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final S3Util s3Util;

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
    public MemberInfo findMemberInfoById(Integer id) {
        // 본인 아니면 에러
        if(!isAuthorized(id))
            throw new MemberException(ErrorCode.API_ERROR_UNAUTHORIZED);
        return MemberInfo.from(findById(id));
    }

    /**
     * @author 이경태
     * @date 2024-04-29
     * @description 아이디 중복 검사
     **/
    public IdCheckResponse idCheck(String userId) {
        // TODO : 추후 Redis 이용해서 임시 저장 구현
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
     * @date 2024-04-29
     * @description Id로 member 찾는 함수
     **/
    public Member findById(Integer id) {
        return memberRepository.findById(id)
            .orElseThrow(() -> new MemberException(ErrorCode.API_ERROR_MEMBER_NOT_FOUND));
    }

    public List<Member> findAll(List<Integer> memberIdList) {
        return memberRepository.findByIdIsInAndDeletedAtIsNull(memberIdList);
    }

    public Member findById(String id){
        return this.findById(Integer.parseInt(id));
    }

    @Transactional
    public UpdateProfileImgResponse updateImg(MultipartFile file, int memberId) {
        // 멤버 찾기
        Member member = findById(memberId);

        // 업로드
        String imageUrl = s3Util.upload(file, ImageType.PROFILE, memberId);
        // 바뀐 url로 갱신
        member.updateImg(imageUrl);

        // 바뀐 url 반환
        return UpdateProfileImgResponse.builder()
                .imageUrl(imageUrl)
                .build();
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
     * @description 권한 검사. 본인 맞는지 확인.
     **/
    private boolean isAuthorized(Integer memberId) {
        SecurityUserDetailsDto securityUserDetailsDto = (SecurityUserDetailsDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("[+] MemberService :: findMemberInfoById :: requested Id : {}, logined Id : {}", memberId, securityUserDetailsDto.memberId());
        return memberId.equals(securityUserDetailsDto.memberId());
    }
}

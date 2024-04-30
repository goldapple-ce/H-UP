package com.a702.hup.global.config.security;

import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberService memberService;

    /**
     * @author 이경태
     * @date 2024-04-27
     * @description db에서 member 정보 확인 후 UserDetails로 변환
     **/
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        log.debug("[+] CustomUserDetailsService :: loadUserByUsername :: start");
        // get Member
        Member member = memberService.findByUserId(userId);
        MemberDto memberDto = MemberDto.from(member);

        SimpleGrantedAuthority grantedAuthority = new SimpleGrantedAuthority(memberDto.role().name());

        log.debug("[+] CustomUserDetailsService :: loadUserByUsername :: role : {}", memberDto.role().name());
        log.debug("[+] CustomUserDetailsService :: loadUserByUsername :: end");
        return new SecurityUserDetailsDto(
                memberDto,
                Collections.singleton(grantedAuthority)
        );
    }
}

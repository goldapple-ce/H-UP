package com.a702.hup.domain.member;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    /**
     * @author 강용민
     * @date 2024-04-25
     * @description id로 찾기, 삭제 시 발견 못함.
     */
    public Member findById(int id){
        return memberRepository.findByIdAndDeletedAtIsNull(id).orElseThrow(()->
                new MemberException(ErrorCode.API_ERROR_MEMBER_NOT_FOUND));
    }
}

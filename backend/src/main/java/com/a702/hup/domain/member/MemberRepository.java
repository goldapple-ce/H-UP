package com.a702.hup.domain.member;

import com.a702.hup.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

interface MemberRepository extends JpaRepository<Member,Integer> {
    Optional<Member> findByUserIdAndDeletedAtIsNull(String userId);
    boolean existsByUserIdAndDeletedAtIsNull(String userId);

    Optional<Member> findByIdAndDeletedAtIsNull(Integer integer);
}
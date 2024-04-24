package com.a702.hup.domain.member;

import com.a702.hup.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

interface MemberRepository extends JpaRepository<Member,Integer> {
}
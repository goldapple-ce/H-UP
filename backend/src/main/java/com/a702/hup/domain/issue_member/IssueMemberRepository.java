package com.a702.hup.domain.issue_member;

import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue_member.entity.IssueMember;
import com.a702.hup.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

interface IssueMemberRepository extends JpaRepository<IssueMember,Integer> {
    boolean existsByIssueAndMemberAndDeletedAtIsNull(Issue issue, Member member);

    Optional<IssueMember> findByIssueAndMember(Issue issue, Member member);
}

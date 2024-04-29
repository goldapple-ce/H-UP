package com.a702.hup.domain.issue_member;

import com.a702.hup.application.exception.AgendaFacadeException;
import com.a702.hup.domain.issue.IssueException;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class IssueMemberService {
    private final IssueMemberRepository issueMemberRepository;

    /**
     * @author 강용민
     * @date 2024-04-25
     * @description 이슈에 권한이 있는지 확인하는 함수
     */
    public void validationRole(Issue issue, Member member) {
        // todo : member에 Role 생기면 추가해야함. owner, maintainer면 가능
        if (!issue.getMember().getId().equals(member.getId()) &&
                issueMemberRepository.existsByIssueAndMemberAndDeletedAtIsNull(issue, member)) {
            throw new IssueException(ErrorCode.API_ERROR_ISSUE_NOT_ROLE);
        }
    }
}

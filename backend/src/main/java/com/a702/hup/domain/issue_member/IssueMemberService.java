package com.a702.hup.domain.issue_member;

import com.a702.hup.domain.agenda.AgendaService;
import com.a702.hup.domain.issue.IssueException;
import com.a702.hup.domain.issue.IssueService;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue_member.entity.IssueMember;
import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class IssueMemberService {
    private final IssueMemberRepository issueMemberRepository;
    private final MemberService memberService;
    private final IssueService issueService;
    private final AgendaService agendaService;

    /**
     * @author 강용민
     * @date 2024-04-25
     * @description 이슈에 권한이 있는지 확인하는 함수. 해당 이슈 담당자나 참여자, 또는 높은 직급이 아닐 경우 예외 발생
     */
    public void validationRole(Issue issue, Member member) {
        // todo : member에 Role 생기면 추가해야함. owner, maintainer면 가능
        if (!issue.getMember().getId().equals(member.getId()) &&
                issueMemberRepository.existsByIssueAndMemberAndDeletedAtIsNull(issue, member)) {
            throw new IssueException(ErrorCode.API_ERROR_ISSUE_NOT_ROLE);
        }
    }

    @Transactional
    public IssueMember save(Issue issue, Member member) {
        IssueMember issueMember = issueMemberRepository.findByIssueAndMember(issue,member).orElseGet(()->
            issueMemberRepository.save(IssueMember.builder()
                    .issue(issue)
                    .member(member).build())
        );
        issueMember.undoDeletion();
        return issueMember;
    }

    @Transactional
    public void saveAll(List<IssueMember> issueMemberList) {
        issueMemberRepository.saveAll(issueMemberList);
    }
}

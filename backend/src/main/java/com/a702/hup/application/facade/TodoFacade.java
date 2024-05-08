package com.a702.hup.application.facade;

import com.a702.hup.application.data.request.TodoSaveRequest;
import com.a702.hup.domain.issue.IssueService;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue_member.IssueMemberService;
import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.todo.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoFacade {
    private final IssueMemberService issueMemberService;
    private final MemberService memberService;
    private final IssueService issueService;
    private final TodoService todoService;

    /**
     * @author 손현조
     * @date 2024-05-07
     * @description 할 일 요청
     **/
    @Transactional
    public void save(Integer requesterId, TodoSaveRequest request) {
        Member requester = memberService.findById(requesterId);
        Issue issue = issueService.findById(request.getIssueId());

        issueMemberService.validationRole(issue, requester);

        todoService.save(issue, requester, request.getContent());
    }

}

package com.a702.hup.application.facade;

import com.a702.hup.application.data.request.TodoAssigneeSaveRequest;
import com.a702.hup.application.data.request.TodoSaveRequest;
import com.a702.hup.domain.issue.IssueService;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue_member.IssueMemberService;
import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.todo.TodoService;
import com.a702.hup.domain.todo.entity.Todo;
import com.a702.hup.domain.todo_member.TodoMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoFacade {
    private final IssueMemberService issueMemberService;
    private final TodoMemberService todoMemberService;
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

    /**
     * @author 손현조
     * @date 2024-05-07
     * @description 할 일 담당자 추가
     **/
    @Transactional
    public void saveAssignee(int memberId, TodoAssigneeSaveRequest request) {
        Todo todo = todoService.findById(request.getTodoId());
        validation(todo, memberId);

        Member assignee = memberService.findById(request.getMemberId());
        todoMemberService.save(todo, assignee);
    }

    /**
     * @author 손현조
     * @date 2024-05-07
     * @description 해당 이슈에 권한이 있는지 검사
     */
    private void validation(Todo todo, int memberId){
        Member member = memberService.findById(memberId);
        issueMemberService.validationRole(todo.getIssue(), member);
    }
}

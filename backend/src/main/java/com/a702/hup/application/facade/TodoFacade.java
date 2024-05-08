package com.a702.hup.application.facade;

import com.a702.hup.application.data.request.TodoAssigneeSaveRequest;
import com.a702.hup.application.data.request.TodoSaveRequest;
import com.a702.hup.application.data.request.TodoUpdateRequest;
import com.a702.hup.domain.issue.IssueService;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue_member.IssueMemberService;
import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.todo.TodoService;
import com.a702.hup.domain.todo.entity.Todo;
import com.a702.hup.domain.todo.entity.TodoStatus;
import com.a702.hup.domain.todo_member.TodoMemberService;
import com.a702.hup.domain.todo_member.entity.TodoMember;
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
    public void saveAssignee(Integer memberId, TodoAssigneeSaveRequest request) {
        Todo todo = todoService.findById(request.getTodoId());
        validation(todo, memberId);

        Member assignee = memberService.findById(request.getMemberId());
        todoMemberService.save(todo, assignee);
    }

    /**
     * @author 손현조
     * @date 2024-05-08
     * @description 할 일 담당자 삭제
     **/
    @Transactional
    public void deleteAssignee(Integer producerId, Integer todoId, Integer assigneeId) {
        Todo todo = todoService.findById(todoId);
        Member assignee = memberService.findById(assigneeId);

        validation(todo, producerId);

        TodoMember todoMember = todoMemberService.findByTodoAndMember(todo, assignee);
        todoMember.deleteSoftly();
    }

    /**
     * @author 손현조
     * @date 2024-05-08
     * @description 할 일 변경
     **/
    @Transactional
    public void update(Integer memberId, TodoUpdateRequest request) {
        Todo todo = todoService.findById(request.getTodoId());
        validation(todo, memberId);
        todo.update(request.getContent(), TodoStatus.valueOf(request.getTodoStatus()));
    }

    /**
     * @author 손현조
     * @date 2024-05-08
     * @description 할 일 삭제
     **/
    @Transactional
    public void delete(Integer memberId, Integer todoId) {
        Todo todo = todoService.findById(todoId);
        Member member = memberService.findById(memberId);

        issueMemberService.validationRole(todo.getIssue(), member);

        todo.deleteSoftly();
    }

    /**
     * @author 손현조
     * @date 2024-05-07
     * @description 해당 이슈에 권한이 있는지 검사
     */
    private void validation(Todo todo, Integer memberId){
        Member member = memberService.findById(memberId);
        issueMemberService.validationRole(todo.getIssue(), member);
    }
}

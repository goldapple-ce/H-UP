package com.a702.hup.application.facade;

import com.a702.hup.application.data.dto.TodoInfo;
import com.a702.hup.application.data.request.TodoAssigneeSaveRequest;
import com.a702.hup.application.data.request.TodoSaveRequest;
import com.a702.hup.application.data.request.TodoUpdateRequest;
import com.a702.hup.application.data.response.TodoInfoListResponse;
import com.a702.hup.domain.issue.IssueService;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue_member.IssueMemberService;
import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.ProjectService;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.domain.todo.TodoService;
import com.a702.hup.domain.todo.entity.Todo;
import com.a702.hup.domain.todo.entity.TodoStatus;
import com.a702.hup.domain.todo_member.TodoMemberService;
import com.a702.hup.domain.todo_member.entity.TodoMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoFacade {
    private final IssueMemberService issueMemberService;
    private final TodoMemberService todoMemberService;
    private final ProjectService projectService;
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
    public void saveAssignee(Integer requesterId, TodoAssigneeSaveRequest request) {
        Todo todo = todoService.findById(request.getTodoId());
        validation(todo, requesterId);

        Member assignee = memberService.findById(request.getMemberId());
        todoMemberService.save(todo, assignee);
    }

    /**
     * @author 손현조
     * @date 2024-05-08
     * @description 할 일 담당자 삭제
     **/
    @Transactional
    public void deleteAssignee(Integer requesterId, Integer todoId, Integer assigneeId) {
        Todo todo = todoService.findById(todoId);
        Member assignee = memberService.findById(assigneeId);

        validation(todo, requesterId);

        TodoMember todoMember = todoMemberService.findByTodoAndMember(todo, assignee);
        todoMember.deleteSoftly();
    }

    /**
     * @author 손현조
     * @date 2024-05-08
     * @description 할 일 변경 (요청자, 담당자 둘 다 수정 가능)
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
    public void delete(Integer requesterId, Integer todoId) {
        Todo todo = todoService.findById(todoId);
        Member member = memberService.findById(requesterId);

        issueMemberService.validationRole(todo.getIssue(), member);

        todo.deleteSoftly();
    }

    /**
     * @author 손현조
     * @date 2024-05-08
     * @description 할 일 리스트 조회
     **/
    public TodoInfoListResponse findTodoList(Integer projectId) {
        Project project = projectService.findById(projectId);
        List<TodoInfo> todoInfoList = project.getIssueList().stream()
                .flatMap(issue -> issue.getTodoList().stream())
                .map(TodoInfo::of)
                .collect(Collectors.toList());
        return TodoInfoListResponse.toResponse(todoInfoList);
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

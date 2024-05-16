package com.a702.hup.domain.todo_member;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.todo.TodoException;
import com.a702.hup.domain.todo.entity.Todo;
import com.a702.hup.domain.todo_member.entity.TodoMember;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoMemberService {
    private final TodoMemberRepository todoMemberRepository;

    /**
     * @author 손현조
     * @date 2024-05-08
     * @description 할 일 담당자 저장
     **/
    @Transactional
    public TodoMember save(Todo todo, Member member) {
        return todoMemberRepository.findByTodoAndMemberAndDeletedAtIsNull(todo, member).orElseGet(() ->
                todoMemberRepository.save(TodoMember.builder()
                        .todo(todo)
                        .member(member).build()
                )
        );
    }

    /**
     * @author 손현조
     * @date 2024-05-08
     * @description 할 일 담당자 조회
     **/
    public TodoMember findByTodoAndMember(Todo todo, Member member) {
        return todoMemberRepository.findByTodoAndMemberAndDeletedAtIsNull(todo, member).orElseThrow(() ->
                new TodoException(ErrorCode.API_ERROR_TODO_MEMBER_NOT_FOUND));
    }

    /**
     * @author 손현조
     * @date 2024-05-16
     * @description 할 일의 담당자 조회
     **/
    public TodoMember findByTodo(Todo todo) {
        return todoMemberRepository.findByTodoAndDeletedAtIsNull(todo).orElseThrow(() ->
                new TodoException(ErrorCode.API_ERROR_TODO_MEMBER_NOT_FOUND));
    }
}

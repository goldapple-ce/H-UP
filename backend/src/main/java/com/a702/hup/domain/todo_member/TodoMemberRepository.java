package com.a702.hup.domain.todo_member;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.todo.entity.Todo;
import com.a702.hup.domain.todo_member.entity.TodoMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TodoMemberRepository extends JpaRepository<TodoMember,Integer> {
    Optional<TodoMember> findByTodoAndMemberAndDeletedAtIsNull(Todo todo, Member member);
    Optional<TodoMember> findByTodoAndDeletedAtIsNull(Todo todo);
}

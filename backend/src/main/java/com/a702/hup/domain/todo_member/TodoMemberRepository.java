package com.a702.hup.domain.todo_member;

import com.a702.hup.domain.todo_member.entity.TodoMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoMemberRepository extends JpaRepository<TodoMember,Integer> {
}

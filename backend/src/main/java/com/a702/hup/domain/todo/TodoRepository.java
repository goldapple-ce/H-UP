package com.a702.hup.domain.todo;

import com.a702.hup.domain.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo,Integer> {
    Optional<Todo> findByIdAndDeletedAtIsNull(Integer todoId);
}

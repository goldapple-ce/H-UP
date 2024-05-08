package com.a702.hup.domain.todo;

import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.todo.entity.Todo;
import com.a702.hup.domain.todo.entity.TodoStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    @Transactional
    public Todo save(Issue issue, Member requester, String content) {
        Todo todo = todoRepository.findByIssueAndRequesterAndContent(issue, requester, content).orElseGet(() ->
                todoRepository.save(Todo.builder()
                        .issue(issue)
                        .requester(requester)
                        .status(TodoStatus.ASSIGNED)
                        .content(content)
                        .build()));
        todo.undoDeletion();
        return todo;
    }

}

package com.a702.hup.domain.todo;

import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.todo.entity.Todo;
import com.a702.hup.global.error.ErrorCode;
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
        return todoRepository.save(Todo.builder()
                .issue(issue)
                .requester(requester)
                .content(content).build());
    }

    public Todo findById(Integer id) {
        return todoRepository.findByIdAndDeletedAtIsNull(id).orElseThrow(
                () -> new TodoException(ErrorCode.API_ERROR_TODO_NOT_FOUND));
    }

}

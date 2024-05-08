package com.a702.hup.domain.todo;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.todo.entity.Todo;
import org.apache.kafka.streams.processor.To;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo,Integer> {
    Optional<Todo> findByIssueAndRequesterAndContent(Issue issue, Member requester, String content);
}

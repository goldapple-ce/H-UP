package com.a702.hup.domain.todo_member.entity;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.team.entity.Team;
import com.a702.hup.domain.todo.entity.Todo;
import com.a702.hup.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.kafka.streams.processor.To;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodoMember extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "todo_id")
    private Todo todo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public TodoMember(Todo todo, Member member) {
        addRelatedTodo(todo);
        addRelatedMember(member);
    }

    private void addRelatedTodo(Todo todo) {
        todo.getTodoMemberList().add(this);
        this.todo = todo;
    }

    private void addRelatedMember(Member member) {
        member.getTodoMemberList().add(this);
        this.member = member;
    }

}

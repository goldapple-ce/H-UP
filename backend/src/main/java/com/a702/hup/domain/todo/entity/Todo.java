package com.a702.hup.domain.todo.entity;

import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.todo_member.entity.TodoMember;
import com.a702.hup.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    private Issue issue;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member requester;

    @Enumerated(EnumType.STRING)
    private TodoStatus status;

    @OneToMany(mappedBy = "todo")
    private List<TodoMember> todoMemberList = new ArrayList<>();

    @Builder
    public Todo(Issue issue, Member requester, String content, TodoStatus status) {
        addRelatedIssue(issue);
        addRelatedMember(requester);
        this.content = content;
        this.status = status;
    }

    private void addRelatedIssue(Issue issue) {
        issue.getTodoList().add(this);
        this.issue = issue;
    }

    private void addRelatedMember(Member member) {
        member.getTodoList().add(this);
        this.requester = member;
    }

}

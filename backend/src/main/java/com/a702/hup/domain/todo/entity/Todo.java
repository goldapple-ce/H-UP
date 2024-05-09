package com.a702.hup.domain.todo.entity;

import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue.entity.IssueStatus;
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

    @OneToMany(mappedBy = "todo")
    private List<TodoMember> todoMemberList = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private IssueStatus status;

    @Builder
    public Todo( Issue issue, String content, IssueStatus status) {
        addRelatedIssue(issue);
        this.content = content;
        this.status = status;
    }

    private void addRelatedIssue(Issue issue) {
        issue.getTodoList().add(this);
        this.issue = issue;
    }
}

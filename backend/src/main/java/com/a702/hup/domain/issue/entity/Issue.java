package com.a702.hup.domain.issue.entity;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.comment.entity.Comment;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.domain.todo.entity.Todo;
import com.a702.hup.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Issue extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @Enumerated(EnumType.STRING)
    private IssueStatus status;

    private LocalDate startDate;

    private LocalDate endDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @OneToMany(mappedBy = "issue")
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "issue")
    private List<Agenda> agendaList = new ArrayList<>();

    @OneToMany(mappedBy = "issue")
    private List<Todo> todoList = new ArrayList<>();

    @Builder
    public Issue(Member member, Project project, String title, LocalDate startDate, LocalDate endDate) {
        addRelatedMember(member);
        addRelatedProject(project);
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        status = IssueStatus.CREATED;
    }

    private void addRelatedMember(Member member) {
        member.getIssueList().add(this);
        this.member = member;
    }

    private void addRelatedProject(Project project) {
        project.getIssueList().add(this);
        this.project = project;
    }
}

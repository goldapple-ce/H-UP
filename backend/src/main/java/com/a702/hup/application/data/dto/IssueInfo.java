package com.a702.hup.application.data.dto;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.comment.entity.Comment;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue.entity.IssueStatus;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.domain.todo.entity.Todo;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class IssueInfo {
    private String title;
    private IssueStatus status;
    private LocalDate startDate;
    private LocalDate endDate;
    private Member member;
    private Project project;
    private List<Comment> commentList;
    private List<Agenda> agendaList;
    private List<Todo> todoList;

    private IssueInfo(String title, IssueStatus status, LocalDate startDate, LocalDate endDate, Member member, Project project, List<Comment> commentList, List<Agenda> agendaList, List<Todo> todoList) {
        this.title = title;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.member = member;
        this.project = project;
        this.commentList = commentList;
        this.agendaList = agendaList;
        this.todoList = todoList;
    }

    public static IssueInfo from(Issue issue) {
        return new IssueInfo(
                issue.getTitle(),
                issue.getStatus(),
                issue.getStartDate(),
                issue.getEndDate(),
                issue.getMember(),
                issue.getProject(),
                issue.getCommentList(),
                issue.getAgendaList(),
                issue.getTodoList()
        );
    }
}

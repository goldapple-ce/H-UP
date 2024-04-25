package com.a702.hup.domain.member.entity;

import com.a702.hup.domain.agenda_comment.entity.AgendaComment;
import com.a702.hup.domain.agenda_member.entity.AgendaMember;
import com.a702.hup.domain.comment.entity.Comment;
import com.a702.hup.domain.comment_receiver.entity.CommentReceiver;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.notification.entity.Notification;
import com.a702.hup.domain.project_member.entity.ProjectMember;
import com.a702.hup.domain.team_member.entity.TeamMember;
import com.a702.hup.domain.todo_member.entity.TodoMember;
import com.a702.hup.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String userId;
    private String password;
    private String img;

    @OneToMany(mappedBy = "member")
    private List<TeamMember> teamMemberList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<ProjectMember> projectMemberList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<CommentReceiver> commentReceiverList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<TodoMember> todoMemberList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<AgendaMember> agendaMemberList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<AgendaComment> agendaCommentList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Issue> issueList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Notification> notificationList = new ArrayList<>();

    @Builder
    public Member(String name, String userId, String password, String img) {
        this.name = name;
        this.userId = userId;
        this.password = password;
        this.img = img;
    }
}

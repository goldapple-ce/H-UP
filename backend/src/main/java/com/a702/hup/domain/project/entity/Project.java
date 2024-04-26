package com.a702.hup.domain.project.entity;

import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.project_member.entity.ProjectMember;
import com.a702.hup.domain.team.entity.Team;
import com.a702.hup.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Project extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String img;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @OneToMany(mappedBy = "project")
    private List<ProjectMember> projectMemberList = new ArrayList<>();

    @OneToMany(mappedBy = "project")
    private List<Issue>issueList = new ArrayList<>();

    @Builder
    public Project(Team team, String name, String img) {
        addRelatedTeam(team);
        this.name = name;
        this.img = img;
    }

    private void addRelatedTeam(Team team) {
        team.getProjectList().add(this);
        this.team = team;
    }
}

package com.a702.hup.domain.project_member.entity;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.domain.team.entity.Team;
import com.a702.hup.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectMember extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    private ProjectMemberRole role;

    @Builder
    public ProjectMember(Project project, Member member, ProjectMemberRole role) {
        addRelatedProject(project);
        addRelatedMember(member);
        this.role = role;
    }

    private void addRelatedProject(Project project) {
        project.getProjectMemberList().add(this);
        this.project = project;
    }

    private void addRelatedMember(Member member) {
        member.getProjectMemberList().add(this);
        this.member = member;
    }

}

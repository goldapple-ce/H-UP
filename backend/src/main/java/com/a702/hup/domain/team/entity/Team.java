package com.a702.hup.domain.team.entity;

import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.domain.team_member.entity.TeamMember;
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
public class Team extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String img;

    @OneToMany(mappedBy = "team")
    private List<TeamMember> teamMemberList = new ArrayList<>();

    @OneToMany(mappedBy = "team")
    private List<Project> projectList = new ArrayList<>();

    @Builder
    public Team(String name, String img) {
        this.name = name;
        this.img = img;
    }

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description 팀 스페이스 이미지 변경
     **/
    public void updateImg(String img) {
        this.img = img;
    }
}

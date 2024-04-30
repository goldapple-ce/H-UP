package com.a702.hup.fixture;

import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.domain.team.entity.Team;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public enum ProjectFixture {
    PROJECT_FIXTURE("pjName","pjImg")
    ;
    private String name;
    private String img;

    ProjectFixture(String name, String img) {
        this.name = name;
        this.img = img;
    }

    public Project create(Team team){
        return Project.builder()
                .team(team)
                .name(this.name)
                .img(this.img)
                .build();
    }

    public Project create(){
        return this.create(TeamFixture.TEAM_FIXTURE.create());
    }
}

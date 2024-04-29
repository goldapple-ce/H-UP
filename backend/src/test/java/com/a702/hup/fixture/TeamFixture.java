package com.a702.hup.fixture;

import com.a702.hup.domain.team.entity.Team;

public enum TeamFixture {
    TEAM_FIXTURE("teamName","teamImg")
    ;
    private String name;
    private String img;

    TeamFixture(String name, String img) {
        this.name = name;
        this.img = img;
    }

    public Team create(){
        return Team.builder()
                .name(this.name)
                .img(this.img)
                .build();
    }
}

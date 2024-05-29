package com.a702.hup.application.data.response;

import com.a702.hup.domain.team.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
public class TeamInfoListResponse {
    private List<TeamInfo> teamInfoList;

    public static TeamInfoListResponse of(List<Team> teamList){
        List<TeamInfo> teamInfoList = new ArrayList<>();
        for(Team team : teamList){
            teamInfoList.add(new TeamInfo(team));
        }
        return new TeamInfoListResponse(teamInfoList);
    }

    @AllArgsConstructor
    @Getter
    static class TeamInfo{
        private int id;
        private String name;

        public TeamInfo(Team team){
            this.id = team.getId();
            this.name = team.getName();
        }
    }
}

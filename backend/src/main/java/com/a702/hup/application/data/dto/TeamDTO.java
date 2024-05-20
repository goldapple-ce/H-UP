package com.a702.hup.application.data.dto;

import com.a702.hup.domain.team.entity.Team;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class TeamDTO {

    @Getter
    @Builder
    public static class TeamInfo {
        private int teamId;
        private String teamName;
        private String teamImg;

        public static TeamInfo from(Team team) {
            return TeamInfo.builder()
                    .teamId(team.getId())
                    .teamName(team.getName())
                    .teamImg(team.getImg())
                    .build();
        }
    }

    @Getter
    @Builder
    public static class TeamInfoList {
        private List<TeamInfo> teamInfoList;
    }

}

package com.a702.hup.application.data.request;

import lombok.Getter;

import java.util.List;

@Getter
public class AddTeamMembersRequest {
    private int teamId;
    private List<Integer> memberIdList;
}

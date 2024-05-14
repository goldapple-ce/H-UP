package com.a702.hup.application.data.response;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.issue.entity.Issue;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Getter
public class AgendaInfoListByIssueResponse {
    private List<AgendaInfoResponse> agendaList;

    public static AgendaInfoListByIssueResponse from(Issue issue){
        List<AgendaInfoResponse> agendaInfoList = new ArrayList<>();
        for(Agenda agenda : issue.getAgendaList()){
            if(!agenda.isSoftDeleted()){
                agendaInfoList.add(AgendaInfoResponse.from(agenda));
            }
        }
        return new AgendaInfoListByIssueResponse(agendaInfoList);
    }
}

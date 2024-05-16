package com.a702.hup.application.data.response;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.issue.entity.Issue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@Getter
public class AgendaInfoListByProjectResponse {
    private List<AgendaInfoByProject> agendaList;

    public static AgendaInfoListByProjectResponse fromOfObject(List<Object[]> agendaList){
        List<AgendaInfoByProject> agendaInfoList = new ArrayList<>();
        for(Object[] object : agendaList){
            Agenda agenda = (Agenda) object[0];
            if(!agenda.isSoftDeleted()){
                agendaInfoList.add(AgendaInfoByProject.from(agenda));
            }
        }
        return AgendaInfoListByProjectResponse.builder().agendaList(agendaInfoList).build();
    }

    public static AgendaInfoListByProjectResponse from(List<Agenda> agendaList){
        List<AgendaInfoByProject> agendaInfoList = new ArrayList<>();
        for(Agenda agenda : agendaList){
            if(!agenda.isSoftDeleted()){
                agendaInfoList.add(AgendaInfoByProject.from(agenda));
            }
        }
        return AgendaInfoListByProjectResponse.builder().agendaList(agendaInfoList).build();
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class AgendaInfoByProject {
        private IssueResponse issue;
        private AgendaInfoResponse agenda;

        public static AgendaInfoByProject from(Agenda agenda){
            return AgendaInfoByProject.builder()
                    .agenda(AgendaInfoResponse.from(agenda))
                    .issue(IssueResponse.from(agenda.getIssue())).build();
        }

        @Getter
        @AllArgsConstructor
        @Builder
        public static class IssueResponse{
            private int id;
            private String title;

            public static IssueResponse from(Issue issue){
                return IssueResponse.builder().id(issue.getId()).title(issue.getTitle()).build();
            }
        }
    }




}

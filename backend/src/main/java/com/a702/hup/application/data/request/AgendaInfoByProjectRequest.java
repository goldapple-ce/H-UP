package com.a702.hup.application.data.request;

import com.a702.hup.domain.agenda.dto.AgendaOptionOfFind;
import com.a702.hup.domain.agenda.entity.AgendaStatus;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AgendaInfoByProjectRequest {
    private List<Integer> memberIdList;
    private List<AgendaStatus> statusList;
    private String content;
    private String type;

    public AgendaOptionOfFind toOption(){
        return AgendaOptionOfFind.from(this.type,this.content);
    }
}

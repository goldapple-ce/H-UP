package com.a702.hup.domain.agenda.dto;

import lombok.*;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class AgendaOptionOfFind {
    private String type;
    private String content;

    public static AgendaOptionOfFind from(String type, String content) {
        return new AgendaOptionOfFind(type, content);
    }
}

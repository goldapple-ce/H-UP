package com.a702.hup.application.data.response;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.agenda_comment.entity.AgendaComment;
import com.a702.hup.domain.agenda_member.entity.AgendaMember;
import com.a702.hup.domain.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AgendaInfoResponse {
    private int id;
    private String content;
    private String createdAt;
    private RelatedMember requester;
    private List<RelatedMember> assigneeList;
    private List<Comment> commentList;

    public static AgendaInfoResponse from(Agenda agenda) {
        List<RelatedMember> assigneeList = new ArrayList<>();
        for (AgendaMember agendaMember : agenda.getAgendaMemberList()) {
            if(!agenda.isSoftDeleted()){
                assigneeList.add(RelatedMember.from(agendaMember));
            }
        }
        List<Comment> commentList = new ArrayList<>();
        for (AgendaComment agendaComment : agenda.getAgendaCommentList()) {
            if(!agendaComment.isSoftDeleted()){
                commentList.add(Comment.from(agendaComment));
            }
        }

        return AgendaInfoResponse.builder()
                .id(agenda.getId())
                .content(agenda.getContent())
                .createdAt(String.valueOf(LocalDate.from(agenda.getCreateAt())))
                .requester(RelatedMember.from(agenda.getRequester()))
                .assigneeList(assigneeList)
                .commentList(commentList)
                .build();
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Getter
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class RelatedMember {
        private int id;
        private Integer assigneeId;
        private String name;

        public static RelatedMember from (Member member) {
            return RelatedMember.builder()
                    .id(member.getId())
                    .name(member.getName())
                    .build();
        }

        public static RelatedMember from (AgendaMember agendaMember) {
            return RelatedMember.builder()
                    .id(agendaMember.getMember().getId())
                    .assigneeId(agendaMember.getId())
                    .name(agendaMember.getMember().getName())
                    .build();
        }
    }

    @AllArgsConstructor
    @Builder
    @Getter
    public static class Comment {
        private RelatedMember commenter;
        private String content;

        public static Comment from(AgendaComment agendaComment) {
            RelatedMember commenter = RelatedMember.from(agendaComment.getMember());
            String content = agendaComment.getContent();

            return Comment.builder()
                    .commenter(commenter)
                    .content(content)
                    .build();
        }
    }
}

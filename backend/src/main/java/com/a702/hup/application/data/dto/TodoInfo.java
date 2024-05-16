package com.a702.hup.application.data.dto;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.todo.entity.Todo;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TodoInfo {
    @NotNull
    private Integer todoId;
    private String content;
    @NotNull
    private String status;
    private MemberDTO.MemberInfo requesterInfo;
    private MemberDTO.MemberInfo assigneeInfo;

    public static TodoInfo of(Todo todo, Member requester, Member assignee) {
        return TodoInfo.builder()
                .todoId(todo.getId())
                .content(todo.getContent())
                .requesterInfo(MemberDTO.MemberInfo.from(requester))
                .assigneeInfo(MemberDTO.MemberInfo.from(assignee))
                .status(String.valueOf(todo.getStatus())).build();
    }

    public static TodoInfo of (Todo todo){
        return TodoInfo.builder()
                .todoId(todo.getId())
                .content(todo.getContent())
                .requesterInfo(MemberDTO.MemberInfo.from(todo.getRequester()))
                .assigneeInfo(todo.getTodoMemberList().isEmpty() ? null :MemberDTO.MemberInfo.from(todo.getTodoMemberList().get(0).getMember()))
                .status(String.valueOf(todo.getStatus())).build();
    }
}

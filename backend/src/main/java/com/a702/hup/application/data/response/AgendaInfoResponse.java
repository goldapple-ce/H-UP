package com.a702.hup.application.data.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class AgendaInfoResponse {
//    "id" : "integer",
//		"title" : "string",
//		"content" : "string",
//		"createdAt" : "date",
//		"requester" : {
//			"id" : "integer",
//
//			"name" : "string"
//		},
//		"responser" : {
//			"id" : "integer",
//			"name" : "string"
//		},
//		"comments" : [
//			{
//				"commenter":{
//					"id" : "integer",
//					"name" : "string"
//				},
//				"content" : "string"
//			},
//		//...
    private int id;
    private String content;
    private LocalDate createdAt;
    private RelatedMember requester;
    private RelatedMember assignee;
    private List<Comment> commentList;

    public 

    @AllArgsConstructor
    @Builder
    @Getter
    static class RelatedMember{
        private int id;
        private int assigneeId;
        private String name;
    }

    @AllArgsConstructor
    @Builder
    @Getter
    static class Comment{
        private RelatedMember commenter;
        private String content;
    }
}

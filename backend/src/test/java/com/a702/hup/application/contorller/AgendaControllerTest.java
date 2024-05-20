package com.a702.hup.application.contorller;

import com.a702.hup.application.data.request.AgendaCreateRequest;
import com.a702.hup.application.data.request.AgendaUpdateRequest;
import com.a702.hup.application.data.response.AgendaInfoResponse;
import com.a702.hup.application.facade.AgendaFacade;
import com.a702.hup.domain.agenda.AgendaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(RestDocumentationExtension.class)
@WebMvcTest(AgendaController.class)
@AutoConfigureRestDocs
@WithMockUser
class AgendaControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AgendaFacade agendaFacade;
    @MockBean
    private AgendaService agendaService;

    @Test
    void agendaSaveTestWhenSuccess() throws Exception {
        AgendaCreateRequest request = new AgendaCreateRequest(1, "의사결정 제공");

        mockMvc.perform(RestDocumentationRequestBuilders
                        .post("/agenda").with(csrf())
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(document("save-agenda",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("issueId").type(JsonFieldType.NUMBER).description("이슈 Id"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("의사결정 내용")
                        )
                ));
    }

    @Test
    void SaveAgendaAssigneeTestWhenSuccess() throws Exception {
        Map<String, Integer> request = new HashMap<>();
        request.put("agendaId", 1);
        request.put("memberId", 1);

        mockMvc.perform(RestDocumentationRequestBuilders
                        .post("/agenda/assignee").with(csrf())
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andDo(document("save-agenda-assignee",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("agendaId").type(JsonFieldType.NUMBER).description("의사결정 Id"),
                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("담당자 Id")
                        )
                ));
    }

    @Test
    void updateAgendaTestWhenSuccess() throws Exception {
        AgendaUpdateRequest request = new AgendaUpdateRequest(1, "수정된 내용", "완료");

        mockMvc.perform(RestDocumentationRequestBuilders
                        .put("/agenda").with(csrf())
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("update-agenda-assignee",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("agendaId").type(JsonFieldType.NUMBER).description("의사결정 Id"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("수정할 내용"),
                                fieldWithPath("status").type(JsonFieldType.STRING).description("상태 변경,[ASSIGNED,PROGRESS,COMPLETED,APPROVED]")
                        )
                ));
    }

    @Test
    void deleteAgendaTestWhenSuccess() throws Exception {
        mockMvc.perform(RestDocumentationRequestBuilders
                        .delete("/agenda/{agendaId}", 1)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("delete-agenda",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint())
                ));
    }

    @Test
    void deleteAssigneeTestWhenSuccess() throws Exception {
        mockMvc.perform(RestDocumentationRequestBuilders
                        .delete("/agenda/assignee/{assigneeId}", 1)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("delete-agenda-assignee",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint())
                ));
    }

    @Test
    void getAgendaInfo() throws Exception {
        List<AgendaInfoResponse.RelatedMember> assigneeList = new ArrayList<>();
        assigneeList.add(AgendaInfoResponse.RelatedMember.builder().id(2).assigneeId(1).name("tester2").build());
        assigneeList.add(AgendaInfoResponse.RelatedMember.builder().id(3).assigneeId(2).name("tester3").build());
        List<AgendaInfoResponse.Comment> commentList = new ArrayList<>();
        commentList.add(AgendaInfoResponse.Comment.builder()
                .commenter(AgendaInfoResponse.RelatedMember.builder()
                        .id(assigneeList.get(0).getId())
                        .name(assigneeList.get(0).getName()).build())
                .content("content")
                .build());
        commentList.add(AgendaInfoResponse.Comment.builder()
                .commenter(AgendaInfoResponse.RelatedMember.builder()
                        .id(assigneeList.get(1).getId())
                        .name(assigneeList.get(1).getName()).build())
                .content("content2")
                .build());
        given(agendaService.getAgendaInfo(anyInt())).willReturn(AgendaInfoResponse.builder()
                .id(1)
                .content("내용")
                .requester(AgendaInfoResponse.RelatedMember.builder()
                        .id(1)
                        .name("tester")
                        .build())
                .createdAt(LocalDate.now().toString())
                .assigneeList(assigneeList)
                .commentList(commentList)
                .build()
        );

        FieldDescriptor[] assigneeDesc = new FieldDescriptor[]{
                fieldWithPath("id").type(JsonFieldType.NUMBER).description("양수인 Member.Id"),
                fieldWithPath("assigneeId").type(JsonFieldType.NUMBER).description("양수인 Id"),
                fieldWithPath("name").type(JsonFieldType.STRING).description("양수인 이름"),
        };

        FieldDescriptor[] commentDesc = new FieldDescriptor[]{
                fieldWithPath("commenter").type(JsonFieldType.OBJECT).description("댓글자"),
                fieldWithPath("commenter.id").type(JsonFieldType.NUMBER).description("댓글자 Member.Id"),
                fieldWithPath("commenter.name").type(JsonFieldType.STRING).description("댓글자 이름"),
                fieldWithPath("content").type(JsonFieldType.STRING).description("댓글 내용"),
        };

        mockMvc.perform(RestDocumentationRequestBuilders
                        .get("/agenda/{agendaId}", 1)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("get-agenda-info",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("id").type(JsonFieldType.NUMBER).description("의사결정 Id"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("의사결정 요청 내용"),
                                fieldWithPath("createdAt").type(JsonFieldType.STRING).description("의사결정 요청 일자"),
                                fieldWithPath("requester").type(JsonFieldType.OBJECT).description("의사결정 요청자"),
                                fieldWithPath("requester.id").type(JsonFieldType.NUMBER).description("의사결정 요청자 Id"),
                                fieldWithPath("requester.name").type(JsonFieldType.STRING).description("의사결정 요청자 이름"),
                                fieldWithPath("assigneeList[]").type(JsonFieldType.ARRAY).description("의사결정 양수인 정보"),
                                fieldWithPath("commentList[]").type(JsonFieldType.ARRAY).description("의사결정 댓글"))
                                .andWithPrefix("assigneeList[].", assigneeDesc)
                                .andWithPrefix("commentList[].", commentDesc)
                ));
    }

}
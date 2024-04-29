package com.a702.hup.application.contorller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureRestDocs
@AutoConfigureMockMvc
class AgendaControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @WithMockUser(username = "test")
    @Test
    void checkGetApi() throws Exception {
        mockMvc.perform(RestDocumentationRequestBuilders
                        .get("/hello")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("hello-get",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
//                                pathParameters(),
//                                requestFields(),
                                responseFields(
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("바디")
                                )
                        )
                );
    }

//    @Test
//    public void checkPostApi() throws Exception {
//        HelloRequestDto requestDto = HelloRequestDto.builder()
//                .stringValue("example")
//                .intValue(1L)
//                .build();
//        String requestBody = objectMapper.writeValueAsString(requestDto);
//
//        mockMvc.perform(RestDocumentationRequestBuilders.post("/api/v1/hello")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(requestBody))
//                .andDo(print())
//                .andExpect(status().is(200))
//                .andDo(document("hello-create",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        resource(
//                                ResourceSnippetParameters.builder()
//                                        .description("Hello 객체를 POST로 만듭니다.")
//                                        .summary("Hello 객체 생성")
//                                        .requestFields(
//                                                fieldWithPath("stringValue").type(
//                                                        JsonFieldType.STRING).description("문자열 값"),
//                                                fieldWithPath("intValue").type(JsonFieldType.NUMBER)
//                                                        .description("정수 값")
//                                        )
//                                        .responseFields(
//                                                fieldWithPath("value").type(JsonFieldType.STRING)
//                                                        .description("리스폰스 메시지"),
//                                                fieldWithPath("success").type(JsonFieldType.BOOLEAN)
//                                                        .description("성공 여부를 나타내는 불린 변수"),
//                                                fieldWithPath("createdOn").type(
//                                                                JsonFieldType.STRING)
//                                                        .description("객체 생성 시각")
//                                        )
//                                        .build()
//                        )
//                ));
//    }
}
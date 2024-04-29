package com.a702.hup.application.contorller;

import com.a702.hup.application.data.request.SaveDocumentsMemberRequest;
import com.a702.hup.application.data.request.SaveDocumentsRequest;
import com.a702.hup.application.facade.DocumentsFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class DocumentsController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final DocumentsFacade documentsFacade;

    /**
     * @author 손현조
     * @date 2024-04-28
     * @description 문서를 사용중인 멤버 추가, 현재 사용중인 멤버들 정보 (Id, 이름, 이미지 url) 반환
     **/
    @MessageMapping("/connection")
    public void connect(SaveDocumentsMemberRequest request) {
        simpMessageSendingOperations.convertAndSend(
                "/sub/members", documentsFacade.saveDocumentMember(request));
    }

    /**
     * @author 손현조
     * @date 2024-04-28
     * @description 문서를 사용중인 멤버 제거, 현재 사용중인 멤버들 정보 (Id, 이름, 이미지 url) 반환
     **/
    @MessageMapping("/disconnection")
    public void disconnect(SaveDocumentsMemberRequest request) {
        simpMessageSendingOperations.convertAndSend(
                "/sub/members", documentsFacade.removeDocumentMember(request));
    }
}

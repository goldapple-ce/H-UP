package com.a702.hup.application.contorller;

import com.a702.hup.application.data.request.DocumentsMemberUpdateRequest;
import com.a702.hup.application.data.request.DocumentsSaveRequest;
import com.a702.hup.application.facade.DocumentsFacade;
import com.a702.hup.domain.documents.redis.DocumentsRedisService;
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
    private final DocumentsRedisService documentsRedisService;
    private final DocumentsFacade documentsFacade;

    /**
     * @author 손현조
     * @date 2024-04-28
     * @description 현재 문서를 받아 저장 후 사용중인 사용자들에게 전송
     **/
    @MessageMapping("/documents")
    public void handleMessage(DocumentsSaveRequest request) {
        log.info("[+] PUB Message :: Documents :: documentsId = " + request.getDocumentsId()
                + ", memberId = " + request.getMemberId()
                + ", chunk = " + request.getMessageChunkInfo().getChunkNum()
                + ", messageId = " + request.getMessageChunkInfo().getMessageId()
                + ", content : " + request.getMessageChunkInfo().getContent());
        simpMessageSendingOperations.convertAndSend(
                "/sub/documents/" + request.getDocumentsId(),
                documentsRedisService.saveDocument(request.getDocumentsId(), request.getMemberId(), request.getMessageChunkInfo()));
    }

    /**
     * @author 손현조
     * @date 2024-04-28
     * @description 문서를 사용중인 멤버 추가, 현재 사용중인 멤버들 정보 (Id, 이름, 이미지 url) 반환
     **/
    @MessageMapping("/connection")
    public void connect(DocumentsMemberUpdateRequest request) {
        log.info("[+] PUB Message :: Conn :: documentsId = " + request.getDocumentsId() + ", memberId = " + request.getMemberId());
        simpMessageSendingOperations.convertAndSend(
                "/sub/members/" + request.getDocumentsId(),
                documentsFacade.saveDocumentMember(request));
    }

    /**
     * @author 손현조
     * @date 2024-04-28
     * @description 문서를 사용중인 멤버 제거, 현재 사용중인 멤버들 정보 (Id, 이름, 이미지 url) 반환
     **/
    @MessageMapping("/disconnection")
    public void disconnect(DocumentsMemberUpdateRequest request) {
        log.info("[+] PUB Message :: DisConn :: documentsId = " + request.getDocumentsId() + ", memberId = " + request.getMemberId());
        simpMessageSendingOperations.convertAndSend(
                "/sub/members/" + request.getDocumentsId(),
                documentsFacade.removeDocumentMember(request));
    }
}

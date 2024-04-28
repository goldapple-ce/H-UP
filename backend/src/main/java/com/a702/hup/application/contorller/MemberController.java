package com.a702.hup.application.contorller;

import com.a702.hup.application.dto.request.MemberSignUpRequest;
import com.a702.hup.application.dto.response.MemberInfoResponse;
import com.a702.hup.domain.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<Void> signUp(@RequestBody MemberSignUpRequest memberSignUpRequest) {
        log.info("[+] MemberController :: signUp :: start");
        memberService.signUp(memberSignUpRequest);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    @GetMapping
    public ResponseEntity<MemberInfoResponse> getInfo(@RequestParam int memberId) {
        log.info("[+] MemberController :: getInfo :: start");
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(memberService.findMemberInfoById(memberId));
    }
}

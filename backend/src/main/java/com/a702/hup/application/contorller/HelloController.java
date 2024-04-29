package com.a702.hup.application.contorller;

import com.a702.hup.application.dto.response.HelloResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class HelloController {

    @GetMapping
    public ResponseEntity<HelloResponse> get() {
        return ResponseEntity.ok()
                .body(new HelloResponse("hello"));
    }

    @PostMapping
    public ResponseEntity<HelloResponse> create() {
        return ResponseEntity.ok()
                .body(new HelloResponse("hello"));
    }
}

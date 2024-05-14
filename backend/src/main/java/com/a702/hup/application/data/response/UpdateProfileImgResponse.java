package com.a702.hup.application.data.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UpdateProfileImgResponse {
    private String imageUrl;

    @Builder
    public UpdateProfileImgResponse(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}

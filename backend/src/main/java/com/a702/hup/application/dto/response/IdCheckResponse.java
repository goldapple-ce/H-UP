package com.a702.hup.application.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class IdCheckResponse {
    private boolean isAvailable;

    @Builder
    public IdCheckResponse(boolean isAvailable) {
        this.isAvailable = isAvailable;
    }
}

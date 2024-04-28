package com.a702.hup.global.config.security;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.member.entity.Role;

import java.time.LocalDateTime;

public record MemberDto(
        Integer memberId,
        String userId,
        String name,
        String password,
        Role role,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        LocalDateTime deletedAt
) {
    public static MemberDto of(
            Integer memberId,
            String userId,
            String name,
            String password,
            Role role,
            LocalDateTime createdAt,
            LocalDateTime updatedAt,
            LocalDateTime deletedAt
    ) {
        return new MemberDto(
                memberId,
                userId,
                name,
                password,
                role,
                createdAt,
                updatedAt,
                deletedAt);
    }

    public static MemberDto from(Member member) {
        return new MemberDto(
                member.getId(),
                member.getUserId(),
                member.getName(),
                member.getPassword(),
                member.getRole(),
                member.getCreateAt(),
                member.getUpdateAt(),
                member.getDeletedAt()
        );
    }
}

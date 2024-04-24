package com.a702.hup.domain.member.entity;

import com.a702.hup.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String userId;
    private String password;
    private String profileImage;

    @Builder
    public Member(String name, String userId, String password, String profileImage) {
        this.name = name;
        this.userId = userId;
        this.password = password;
        this.profileImage = profileImage;
    }
}

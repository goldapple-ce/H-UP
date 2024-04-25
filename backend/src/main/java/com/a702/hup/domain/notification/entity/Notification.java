package com.a702.hup.domain.notification.entity;

import com.a702.hup.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    private String content;

    private String url;

    @Builder
    public Notification(Member member, NotificationType type, String content, String url) {
        addRelatedMember(member);
        this.type = type;
        this.content = content;
        this.url = url;
    }

    private void addRelatedMember(Member member) {
        member.getNotificationList().add(this);
        this.member = member;
    }

}

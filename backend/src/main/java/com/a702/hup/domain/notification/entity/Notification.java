package com.a702.hup.domain.notification.entity;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Notification extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member receiver;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    private String content;

    private String url;

    @Builder
    public Notification(Member receiver, NotificationType type, String content, String url) {
        addRelatedMember(receiver);
        this.type = type;
        this.content = content;
        this.url = url;
    }

    private void addRelatedMember(Member receiver) {
        receiver.getNotificationList().add(this);
        this.receiver = receiver;
    }

}

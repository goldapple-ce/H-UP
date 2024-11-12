package com.a702.hup.domain.notification;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Integer> {
    List<Notification> findAllByReceiverAndCreateAtAfter(Member member, LocalDateTime createAt);
}

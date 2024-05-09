package com.a702.hup.domain.comment_receiver;

import com.a702.hup.domain.comment_receiver.entity.CommentReceiver;
import org.springframework.data.jpa.repository.JpaRepository;

interface CommentReceiverRepository extends JpaRepository<CommentReceiver,Integer> {
}

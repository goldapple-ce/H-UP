package com.a702.hup.domain.comment;

import com.a702.hup.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

interface CommentRepository extends JpaRepository<Comment,Integer> {
}

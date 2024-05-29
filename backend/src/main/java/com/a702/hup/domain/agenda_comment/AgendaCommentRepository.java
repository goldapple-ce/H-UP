package com.a702.hup.domain.agenda_comment;

import com.a702.hup.domain.agenda_comment.entity.AgendaComment;
import org.springframework.data.jpa.repository.JpaRepository;

interface AgendaCommentRepository extends JpaRepository<AgendaComment, Integer> {
}

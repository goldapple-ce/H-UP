package com.a702.hup.domain.agenda_comment;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.agenda_comment.entity.AgendaComment;
import com.a702.hup.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AgendaCommentService {
    private final AgendaCommentRepository agendaCommentRepository;

    /**
     * @author 강용민
     * @date 2024-05-08
     * @description 저장
     */
    @Transactional
    public AgendaComment save(Agenda agenda, Member member, String content) {
        return agendaCommentRepository.save(AgendaComment.builder()
                .agenda(agenda)
                .member(member)
                .content(content)
                .build());
    }
}

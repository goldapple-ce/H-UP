package com.a702.hup.domain.agenda_member;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.agenda_member.entity.AgendaMember;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.notification.NotificationService;
import com.a702.hup.domain.notification.entity.NotificationType;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AgendaMemberService {
    private final AgendaMemberRepository agendaMemberRepository;
    private final NotificationService notificationService;

    /**
     * @author 강용민
     * @date 2024-04-29
     * @description 의사결정 담당자 저장
     */
    @Transactional
    public AgendaMember save(Agenda agenda, Member member) {
        notificationService.send(member.getId(), NotificationType.MENTIONED,agenda.getIssue().getTitle()+"에서 "+agenda.getRequester().getName()+"이 당신을 멘션하셨습니다.\n 내용 : "+agenda.getContent(),"/issue/"+agenda.getIssue().getId());
        return agendaMemberRepository.findByMemberAndAgendaAndDeletedAtIsNull(member, agenda).orElseGet(() ->
                agendaMemberRepository.save(AgendaMember.builder()
                        .agenda(agenda)
                        .member(member).build()
                )
        );
    }

    /**
     * @author 강용민
     * @date 2024-04-30
     * @description 의사결정 담당자 삭제
     */
    @Transactional
    public void delete(int assigneeId){
        Optional<AgendaMember> optionalAssignee = agendaMemberRepository.findById(assigneeId);
        if(optionalAssignee.isPresent()){
            AgendaMember assignee = optionalAssignee.get();
            assignee.deleteSoftly();
        }
    }

    public AgendaMember findById(int assigneeId) {
        return agendaMemberRepository.findById(assigneeId).orElseThrow(()->
                new AgendaMemberException(ErrorCode.API_ERROR_AGENDA_MEMBER_NOT_FOUND));
    }
}

package com.a702.hup.domain.agenda;

import com.a702.hup.application.data.response.AgendaInfoResponse;
import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AgendaService {
    private final AgendaRepository agendaRepository;

    /**
     * @author 강용민
     * @date 2024-04-25
     * @description 의사결정 생성
     */
    @Transactional
    public Agenda save(Issue issue, Member requester, String content) {
        Agenda agenda = agendaRepository.findByIssueAndRequesterAndContent(issue, requester, content).orElseGet(() ->
                agendaRepository.save(Agenda.builder()
                        .issue(issue)
                        .requester(requester)
                        .content(content)
                        .build()));
        agenda.undoDeletion();
        return agenda;
    }

    /**
     * @author 강용민
     * @date 2024-04-25
     * @description 의사결정 id로 찾기, 삭제가 되었을때는 찾을 수 없음
     */
    public Agenda findById(int id) {
        return agendaRepository.findByIdAndDeletedAtIsNull(id).orElseThrow(() ->
                new AgendaException(ErrorCode.API_ERROR_AGENDA_NOT_FOUND)
        );
    }

    /**
     * @author 강용민
     * @date 2024-05-02
     * @description Id별 의사결정 가져오기
     */
    public AgendaInfoResponse getAgendaInfo(int agendaId) {
        Agenda agenda = this.findById(agendaId);
        return AgendaInfoResponse.from(agenda);
    }

    /**
     * @author 강용민
     * @date 2024-05-02
     * @description Project 별 의사결정 가져오기
     */
    public List<Agenda> findByProject(Project project){
        return agendaRepository.findAllByProject(project);
    }

    /**
     * @author 강용민
     * @date 2024-05-03
     * @description Project 별 의사결정 가져오기
     */
    public List<Agenda> findNearByProject(Member member, Project project) {
        return agendaRepository.findAllByProject(member,project);
    }
}

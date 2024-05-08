package com.a702.hup.domain.agenda;

import com.a702.hup.domain.agenda.dto.AgendaOptionOfFind;
import com.a702.hup.domain.agenda.entity.AgendaStatus;
import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.ProjectService;
import com.a702.hup.domain.project.entity.Project;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;

@Transactional
@SpringBootTest
class AgendaServiceTest {
    @Autowired
    private AgendaService agendaService;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private MemberService memberService;
    @Test
    void findByProjectAndOptionTest() {
        Project project = projectService.findById(1);
        List<Integer> memberList = new ArrayList<>();
        memberList.add(1);
        List<AgendaStatus> agendaStatusList = new ArrayList<>();
        agendaStatusList.add(AgendaStatus.ASSIGNED);
        agendaStatusList.add(AgendaStatus.COMPLETED);

        AgendaOptionOfFind option = AgendaOptionOfFind.from(null, null);
        assertDoesNotThrow(() -> {
            List<Object[]> agendaList = agendaService.findByProjectAndOption(project, memberList, agendaStatusList, option);
            assertEquals(2, agendaList.size());
        });
    }

    @Test
    void testFindByProject() {
        Project project = projectService.findById(1);
        Member member = memberService.findById(1);
        assertDoesNotThrow(() -> {
            List<Object[]> agendaList = agendaService.findNearByProject(project, member);
            assertEquals(1, agendaList.size());
        });
    }
}
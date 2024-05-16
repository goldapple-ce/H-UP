package com.a702.hup.domain.agenda;

import com.a702.hup.domain.agenda.entity.Agenda;
import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.ProjectService;
import com.a702.hup.domain.project.entity.Project;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

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
        assertDoesNotThrow(() -> {
            List<Agenda> agendaList = agendaService.findByProjectAndOption(project, null);
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
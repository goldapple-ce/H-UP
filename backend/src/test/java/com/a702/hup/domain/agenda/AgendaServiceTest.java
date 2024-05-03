package com.a702.hup.domain.agenda;

import com.a702.hup.domain.agenda.entity.Agenda;
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

    @Test
    void findByProject() {
        Project project = projectService.findById(1);
        assertDoesNotThrow(()->{
            List<Agenda> agendaList = agendaService.findByProject(project);
            assertEquals(1,agendaList.size());
        });
    }

    @Test
    void testFindByProject() {

    }
}
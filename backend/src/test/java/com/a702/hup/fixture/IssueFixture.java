package com.a702.hup.fixture;

import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue.entity.IssueStatus;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.entity.Project;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDate;

public enum IssueFixture {
    ISSUE_FIXTURE("이슈1",LocalDate.of(2024,4,1),LocalDate.of(2024,4,30)),
    ;

    private String title;
    private LocalDate startDate;

    private LocalDate endDate;

    IssueFixture(String title, LocalDate startDate, LocalDate endDate) {
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Issue create(Project project, Member member){
        return Issue.builder()
                .project(project)
                .member(member)
                .title(this.title)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .build();
    }

    public Issue create(){
        return this.create(ProjectFixture.PROJECT_FIXTURE.create(), MemberFixture.MEMBER_FIXTURE.create());
    }
}

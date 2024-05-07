package com.a702.hup.domain.issue_member.entity;

import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class IssueMember extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id")
    private Issue issue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public IssueMember(Issue issue, Member member) {
        addRelatedIssue(issue);
        this.member = member;
    }

    private void addRelatedIssue(Issue issue) {
        issue.getIssueMemberList().add(this);
        this.issue = issue;
    }
}

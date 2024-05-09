package com.a702.hup.domain.comment.entity;

import com.a702.hup.domain.comment_receiver.entity.CommentReceiver;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id")
    private Issue issue;

    private String content;

    @OneToMany(mappedBy = "comment")
    private List<CommentReceiver> commentReceiverList;

    @Builder
    public Comment(Member member, Issue issue, String content) {
        this.member = member;
        this.issue = issue;
        this.content = content;
    }
}

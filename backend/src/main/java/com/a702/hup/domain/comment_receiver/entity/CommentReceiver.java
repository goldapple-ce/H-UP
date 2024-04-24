package com.a702.hup.domain.comment_receiver.entity;

import com.a702.hup.domain.comment.entity.Comment;
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
public class CommentReceiver extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @Builder
    public CommentReceiver(Member member, Comment comment) {
        this.member = member;
        addRelated(comment);
    }

    private void addRelated(Comment comment){
        this.comment = comment;
        comment.getCommentReceiverList().add(this);
    }
}

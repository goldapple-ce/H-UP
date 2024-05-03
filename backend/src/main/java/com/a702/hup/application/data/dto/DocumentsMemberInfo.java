package com.a702.hup.application.data.dto;

import com.a702.hup.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentsMemberInfo implements Serializable {
    private Integer memberId;
    private String name;
    private String img;

    public static DocumentsMemberInfo from(Member member) {
        return DocumentsMemberInfo.builder()
                .memberId(member.getId())
                .name(member.getName())
                .img(member.getImg())
                .build();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DocumentsMemberInfo that = (DocumentsMemberInfo) o;
        return Objects.equals(memberId, that.memberId) &&
                Objects.equals(img, that.img) &&
                Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(memberId, img, name);
    }
}

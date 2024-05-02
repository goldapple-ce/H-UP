package com.a702.hup.domain.documents.redis.entity;

import com.a702.hup.application.data.dto.DocumentsMemberInfo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.HashSet;
import java.util.Set;

@Getter
@NoArgsConstructor
@RequiredArgsConstructor
@RedisHash(value = "documentsMembers")
public class ActiveDocumentsMembersRedis {

    @Id
    @NonNull
    private String documentsId;
    private Set<DocumentsMemberInfo> memberInfoSet = new HashSet<>();

    public void addMember(DocumentsMemberInfo memberInfo){
        memberInfoSet.add(memberInfo);
    }

    public void removeMember(DocumentsMemberInfo memberInfo){
        memberInfoSet.remove(memberInfo);
    }

    public boolean isDocumentMemberEmpty() {
        return memberInfoSet.isEmpty();
    }

}

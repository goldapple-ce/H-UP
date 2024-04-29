package com.a702.hup.domain.document.redis.entity;

import com.a702.hup.application.data.dto.DocumentsMemberInfo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@RequiredArgsConstructor
@RedisHash(value = "documentMembers")
public class ActiveDocumentsMembersRedis {

    @Id
    @NonNull
    private String documentId;
    private List<DocumentsMemberInfo> memberDtoList = new ArrayList<>();

    public void addMember(DocumentsMemberInfo memberDto){
        memberDtoList.add(memberDto);
    }

    public void removeMember(DocumentsMemberInfo memberDto){
        memberDtoList.remove(memberDto);
    }

}

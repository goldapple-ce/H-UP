package com.a702.hup.global.entity;

import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
//@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @CreatedDate
    private LocalDateTime createAt;

    @LastModifiedDate
    private LocalDateTime updateAt;

    private LocalDateTime deletedAt;

    public void deleteSoftly() {
        this.deletedAt = LocalDateTime.now();
    }

    public boolean isSoftDeleted() {
        return this.deletedAt != null;
    }

    public void undoDeletion() {
        if (isSoftDeleted()) {
            this.deletedAt = null;
        }
    }
}

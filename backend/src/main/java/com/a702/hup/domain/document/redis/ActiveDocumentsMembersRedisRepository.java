package com.a702.hup.domain.document.redis;

import com.a702.hup.domain.document.redis.entity.ActiveDocumentsMembersRedis;
import org.springframework.data.repository.CrudRepository;

public interface ActiveDocumentsMembersRedisRepository extends CrudRepository<ActiveDocumentsMembersRedis, String> {
}

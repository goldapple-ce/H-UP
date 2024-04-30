package com.a702.hup.domain.document.redis;

import com.a702.hup.domain.document.redis.entity.DocumentsRedis;
import org.springframework.data.repository.CrudRepository;

public interface DocumentsRedisRepository extends CrudRepository<DocumentsRedis, String> {
}

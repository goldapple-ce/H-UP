package com.a702.hup.domain.documents.redis;

import com.a702.hup.domain.documents.redis.entity.DocumentsRedis;
import org.springframework.data.repository.CrudRepository;

interface DocumentsRedisRepository extends CrudRepository<DocumentsRedis, String> {
}

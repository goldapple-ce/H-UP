package com.a702.hup.domain.auth.redis;

import org.springframework.data.repository.CrudRepository;

interface TokenRepository extends CrudRepository<Token, String> {
}

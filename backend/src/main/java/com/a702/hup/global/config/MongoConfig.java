package com.a702.hup.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = {
        "com.a702.hup.domain.documents.mongodb"
})
public class MongoConfig {
}

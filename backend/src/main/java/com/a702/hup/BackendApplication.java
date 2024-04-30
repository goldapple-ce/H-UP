package com.a702.hup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@SpringBootApplication
@EnableRedisRepositories(basePackages = {
		"**.redis.**"
})
@EnableMongoRepositories(basePackages = {
		"**.mongodb.**"
})
@EnableJpaRepositories(excludeFilters = {
		@ComponentScan.Filter(type = FilterType.REGEX, pattern = "com.*.redis.*"),
		@ComponentScan.Filter(type = FilterType.REGEX, pattern = "com.*.mongodb.*")
})
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}

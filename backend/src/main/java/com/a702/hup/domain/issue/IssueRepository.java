package com.a702.hup.domain.issue;

import com.a702.hup.domain.issue.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

interface IssueRepository extends JpaRepository<Issue, Integer> {
}

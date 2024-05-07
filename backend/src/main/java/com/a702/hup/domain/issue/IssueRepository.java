package com.a702.hup.domain.issue;

import com.a702.hup.domain.issue.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

interface IssueRepository extends JpaRepository<Issue, Integer> {
    Optional<Issue> findByIdAndDeletedAtIsNull(int id);
    Optional<List<Issue>> findByProjectId(int projectId);
    Optional<List<Issue>> findByMemberId(int memberId);
}

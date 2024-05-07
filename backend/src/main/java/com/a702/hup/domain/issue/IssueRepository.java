package com.a702.hup.domain.issue;

import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue.entity.IssueStatus;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

interface IssueRepository extends JpaRepository<Issue, Integer> {
    Optional<Issue> findByIdAndDeletedAtIsNull(int id);
    Optional<List<Issue>> findByProjectId(int projectId);
    Optional<List<Issue>> findByMemberId(int memberId);

    @Query("SELECT i FROM Issue i " +
            "JOIN i.project p " +
            "WHERE p.team.id = :teamId AND i.id < :lastId " +
            "ORDER BY i.id DESC")
    Slice<Issue> findPageByTeamId(int teamId, int lastId, PageRequest pageable);

    @Query(value = "SELECT * " +
            "FROM ( " +
            "   SELECT i.*, " +
            "   ROW_NUMBER() OVER (PARTITION BY i.status ORDER BY i.id DESC) as rn " +
            "   FROM issue i " +
            "   WHERE i.project_id = :projectId " +
            ") subquery " +
            "WHERE subquery.rn <= 5", nativeQuery = true)
    List<Issue> findTop5IssueEachStatus(int projectId);

    @Query(value = "SELECT i " +
            "FROM Issue i " +
            "WHERE i.project.id = :projectId " +
            "AND i.status = :status " +
            "AND i.id < :lastId " +
            "ORDER BY i.id DESC")
    List<Issue> findTop5IssueByStatusAndProjectId(int projectId, IssueStatus status, int lastId, Pageable pageable);
}

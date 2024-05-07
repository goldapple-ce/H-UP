package com.a702.hup.application.facade;

import com.a702.hup.application.data.dto.MemberInfo;
import com.a702.hup.application.data.request.IssueSaveRequest;
import com.a702.hup.application.data.response.IssueDetailsResponse;
import com.a702.hup.domain.documents.mongodb.DocumentsMongoService;
import com.a702.hup.domain.documents.redis.DocumentsRedisService;
import com.a702.hup.domain.issue.IssueException;
import com.a702.hup.domain.issue.IssueService;
import com.a702.hup.domain.issue.entity.Issue;
import com.a702.hup.domain.issue_member.IssueMemberService;
import com.a702.hup.domain.member.MemberService;
import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.project.ProjectService;
import com.a702.hup.domain.project.entity.Project;
import com.a702.hup.domain.project_member.ProjectMemberService;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class IssueFacade {
    private final IssueService issueService;
    private final MemberService memberService;
    private final ProjectService projectService;
    private final IssueMemberService issueMemberService;
    private final ProjectMemberService projectMemberService;
    private final DocumentsRedisService documentsRedisService;
    private final DocumentsMongoService documentsMongoService;

    @Transactional
    public Issue save(int memberId, IssueSaveRequest request){
        Member member = memberService.findById(memberId);
        Project project = projectService.findById(request.getProjectId());
        validation(member,project);
        Issue issue = issueService.save(project,member);
        issueMemberService.save(issue,member);
        documentsMongoService.save(String.valueOf(issue.getId()),"");
        return issue;
    }

    private void validation(Member member, Project project){
        if(!projectMemberService.isMember(project,member)){
            throw new IssueException(ErrorCode.API_ERROR_ISSUE_NOT_ROLE);
        }
    }

    /**
     * @author 손현조
     * @date 2024-05-07
     * @description 상세 조회 (제목, 날짜, 소속 프로젝트, 생성자) (내용은 X)
     **/
    public IssueDetailsResponse findIssueDetailsById(Integer issueId) {
        Issue issue = issueService.findById(issueId);
        return IssueDetailsResponse.toResponse(
                issue,
                documentsRedisService.findDocumentRedisById(Integer.toString(issueId)).getContent(),
                issue.getProject(),
                issue.getMember(),
                createMemberInfoList(issue));
    }

    private List<MemberInfo> createMemberInfoList(Issue issue) {
        return issue.getIssueMemberList().stream()
                .map(issueMember -> MemberInfo.from(issueMember.getMember()))
                .collect(Collectors.toList());
    }
}

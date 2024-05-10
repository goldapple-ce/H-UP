package com.a702.hup.domain.team;

import com.a702.hup.domain.member.entity.Member;
import com.a702.hup.domain.team.entity.Team;
import com.a702.hup.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamService {
    private final TeamRepository teamRepository;

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description 팀 생성
     **/
    @Transactional
    public Team save(String teamName) {
        return teamRepository.save(Team.builder()
                .name(teamName)
                .build());
    }

    /**
     * @author 이경태
     * @date 2024-05-03
     * @description 팀 검색
     **/
    public Team findById(int teamId) {
        return teamRepository.findById(teamId)
                .orElseThrow(() -> new TeamException(ErrorCode.API_ERROR_TEAM_NOT_FOUND));
    }

    /**
     * @author 강용민
     * @date 2024-05-10
     * @description 팀 검색
     */
    public List<Team> findByMember(Member member) {
        return teamRepository.findByMember(member);
    }
}

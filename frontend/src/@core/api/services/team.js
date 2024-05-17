import { authAxios } from '@api';
import API_URI from '@constant/uri';

// team 목록 조회
export const requestTeamList = async () => {
  return await authAxios.get(`${API_URI.TEAM_LIST}`);
};

// team 멤버 조회
export const requestTeamMemberList = async teamId => {
  return await authAxios.get(`${API_URI.TEAM_MEMBER_LIST}/${teamId}`);
};

// team 생성
export const requestCreateTeam = async data => {
  return await authAxios.post(`${API_URI.TEAM}`, data);
};

// team 초대
export const requestTeamInviteMember = async data => {
  return authAxios.post(`${API_URI.PROJECT_INVITE_MEMBER}`, data);
};

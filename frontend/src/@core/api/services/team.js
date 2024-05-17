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

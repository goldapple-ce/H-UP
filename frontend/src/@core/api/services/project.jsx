import API_URI from '@constant/uri';
import { authAxios } from '..';

export const inviteProjectMember = data => {
  return authAxios.post(`${API_URI.INVITE_PROJECT_MEMBER}`, data);
}

export const inviteTeamMember = data => {
  return authAxios.post(`${API_URI.INVITE_TEAM_MEMBER}`, data);
}
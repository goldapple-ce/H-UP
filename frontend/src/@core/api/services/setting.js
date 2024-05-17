import API_URI from '@constant/uri';
import { authAxios } from '@api';

export const requestMyTeam = () => {
  return authAxios.get(`${API_URI.SHOW_TEAM}`);
};

export const requestTeamMember = teamId => {
  return authAxios.get(`${API_URI.SHOW_TEAM_MEMBER}/${teamId}`);
};

export const requestProject = teamId => {
    return authAxios.get(`${API_URI.SHOW_TEAM_PROJECT}/${teamId}`);
}

export const requestProjectMember = projectId =>{
    return authAxios.get(`${API_URI.SHOW_PROJECT_MEMBER}/${projectId}`)
}

export const inviteProjectMember = data => {
  return authAxios.post(`${API_URI.INVITE_PROJECT_MEMBER}`, data);
}
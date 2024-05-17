import { authAxios } from '@api';
import API_URI from '@constant/uri';

export const LoadMyTeamList = () => {
    return authAxios.get(`${API_URI.MY_TEAM_LIST}`);
};

export const LoadTeamProjectList = (teamId) => {
    return authAxios.get(`${API_URI.MY_PROJECT_LIST}/${teamId}`);
};

export const LoadProjectIssueList = (teamId) => {
    return authAxios.get(`${API_URI.MY_ISSUE_LIST}/${teamId}`);
};

export const CreateTeam = data => {
    return authAxios.post(`${API_URI.TEAM}`, data);
};
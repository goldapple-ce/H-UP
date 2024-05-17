import { authAxios } from '@api';
import API_URI from '@constant/uri';

export const LoadMyTeamList = async () => {
  return await authAxios.get(`${API_URI.MY_TEAM_LIST}`);
};

export const LoadTeamProjectList = async teamId => {
  return await authAxios.get(`${API_URI.MY_PROJECT_LIST}/${teamId}`);
};

export const LoadProjectIssueList = async teamId => {
  return await authAxios.get(`${API_URI.MY_ISSUE_LIST}/${teamId}`);
};

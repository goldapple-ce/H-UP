import { authAxios } from '@api';
import API_URI from '@constant/uri';

export const requestIssueList = async projectId => {
  console.log('get Issues');
  return await authAxios.get(`${API_URI.ISSUE_LIST}/${projectId}`);
};

export const LoadIssueData = async issueId => {
  return await authAxios.get(`${API_URI.ISSUE}/${issueId}`);
};

export const updateIssueStatus = async data => {
  return await authAxios.post(`${API_URI.UPDATE_ISSUE_STATUS}`, data);
};

export const createIssue = async data => {
  return await authAxios.post(`${API_URI.ISSUE}`, data);
};

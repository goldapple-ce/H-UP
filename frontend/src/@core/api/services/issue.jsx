import { authAxios } from '@api';
import API_URI from '@constant/uri';

export const LoadIssueList = projectId => {
  return authAxios.get(`${API_URI.ISSUE_LIST}/${projectId}`);
};

export const LoadIssueData = issueId => {
  return authAxios.get(`${API_URI.ISSUE}/${issueId}`);
};

export const updateIssueStatus = data => {
  return authAxios.post(`${API_URI.UPDATE_ISSUE_STATUS}`, data);
};

export const createIssue = data => {
  return authAxios.post(`${API_URI.ISSUE}`, data);
}
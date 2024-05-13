import { authAxios } from '@api';
import API_URI from '@constant/uri';

export const LoadIssueList = memberId => {
  memberId = 1; // 테스트 코드
  return authAxios.get(`${API_URI.ISSUE_LIST}/${memberId}`);
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
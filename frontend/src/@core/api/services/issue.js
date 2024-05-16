import { authAxios } from '@api';
import API_URI from '@constant/uri';

// 이슈 목록 조회
export const requestIssueList = async projectId => {
  console.log('get Issues');
  return await authAxios.get(`${API_URI.ISSUE_LIST}/${projectId}`);
};

// 이슈 상세 조회
export const LoadIssueData = async issueId => {
  return await authAxios.get(`${API_URI.ISSUE}/${issueId}`);
};

// 이슈 상태 변경
export const updateIssueStatus = async data => {
  return await authAxios.post(`${API_URI.UPDATE_ISSUE_STATUS}`, data);
};

// 이슈 생성
export const createIssue = async data => {
  return await authAxios.post(`${API_URI.ISSUE}`, data);
};

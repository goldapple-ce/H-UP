import API_URI from '@constant/uri';
import { authAxios } from '..';

// 프로젝트 저장
export const requestSaveProject = async data => {
  return authAxios.post(`${API_URI.PROJECT}`, data);
};

// 프로젝트 멤버 조회
export const requestProjectMemberList = async projectId => {
  return await authAxios.get(`${API_URI.PROJECT_MEMBER_LIST}/${projectId}`);
};

// 팀 프로젝트 목록 조회
export const requestTeamProjectList = async teamId => {
  return await authAxios.get(`${API_URI.PROJECT_LIST}/${teamId}`);
};

// 프로젝트 멤버 초대
export const inviteProjectMember = data => {
  return authAxios.post(`${API_URI.INVITE_PROJECT_MEMBER}`, data);
}

// 팀 멤버 초대
export const inviteTeamMember = data => {
  return authAxios.post(`${API_URI.INVITE_TEAM_MEMBER}`, data);
}
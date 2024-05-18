import API_URI from '@constant/uri';
import { authAxios } from '..';

// agenda 목록 조회
export const requestAgendaList = async projectId => {
  return await authAxios.get(`${API_URI.AGENDA_LIST}/${projectId}`);
};

// agenda 생성
export const createAgenda = async data => {
  return await authAxios.post(`${API_URI.AGENDA}`, data);
};

// agenda 할당
export const AddAgendaAssignee = async data => {
  return await authAxios.post(`${API_URI.AGENDA_ASSIGNEE}`, data);
};

// agenda 삭제
export const deleteAgenda = async agendaId => {
  return await authAxios.delete(`${API_URI.AGENDA}/${agendaId}`);
};

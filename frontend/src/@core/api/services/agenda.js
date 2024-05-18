import API_URI from '@constant/uri';
import { authAxios } from '..';

// to_do 목록 조회
export const requestAgendaList = async projectId => {
  return await authAxios.get(`${API_URI.AGENDA_LIST}/${projectId}`);
};

export const createAgenda = async data => {
  return await authAxios.post(`${API_URI.AGENDA}`, data);
}

export const AddAgendaAssignee = async data => {
  return await authAxios.post(`${API_URI.AGENDA_ASSIGNEE}`, data);
}

export const deleteAgenda = async agendaId => {
  return await authAxios.delete(`${API_URI.AGENDA}/${agendaId}`);
}
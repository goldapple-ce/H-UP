import API_URI from '@constant/uri';
import { authAxios } from '..';

// to_do 목록 조회
export const requestAgendaList = async (projectId, data) => {
  return await authAxios.post(`${API_URI.AGENDA_LIST}/${projectId}`, data);
};

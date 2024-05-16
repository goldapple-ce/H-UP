import { authAxios } from '@api';
import API_URI from '@constant/uri';

export const LoadAgendaList = projectId => {
  return authAxios.get(`${API_URI.AGENDA_LIST}/${projectId}`);
};

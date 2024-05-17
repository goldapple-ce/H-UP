import API_URI from '@constant/uri';
import { authAxios } from '..';

export const requestTeamProjectList = async teamId => {
  return await authAxios.get(`${API_URI.PROJECT_LIST}/${teamId}`);
};

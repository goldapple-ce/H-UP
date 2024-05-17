import { authAxios } from '@api';
import API_URI from '@constant/uri';

export const requestTeamList = async () => {
  return await authAxios.get(`${API_URI.TEAM_LIST}`);
};

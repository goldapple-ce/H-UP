import { authAxios } from '@api';
import API_URI from '@constant/uri';

export const PostProject = data => {
  return authAxios.post(`${API_URI.PROJECT}`, data);
};
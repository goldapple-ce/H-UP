import { baseAxios } from '@api';
import API_URI from '@constant/uri';

export const requestLogin = data => {
  return baseAxios.post(`${API_URI.LOGIN}`, data);
};

export const requestSignup = data => {
  return baseAxios.post(`${API_URI.SIGN_UP}`, data);
};

export const requestIdCheck = userId => {
  return baseAxios.get(`${API_URI.ID_CHECK}`, {
    params: {
      userId: userId,
    },
  });
};

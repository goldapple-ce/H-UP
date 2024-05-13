import { baseAxios } from '@api';
import API_URI from '@constant/uri';

// 로그인
export const requestLogin = data => {
  return baseAxios.post(`${API_URI.LOGIN}`, data);
};

// 회원 가입
export const requestSignup = data => {
  return baseAxios.post(`${API_URI.SIGN_UP}`, data);
};

// 아이디 중복 검사
export const requestIdCheck = userId => {
  return baseAxios.get(`${API_URI.ID_CHECK}`, {
    params: {
      userId: userId,
    },
  });
};

// 토큰 갱신
export const requestTokenRefresh = () => {
  return baseAxios.post(`${API_URI.REFRESH}`, {
    headers: {
      refreshToken: localStorage.getItem('refreshToken'),
    },
  });
};

import { baseAxios } from '@api';
import API_URI from '@constant/uri';

// 로그인
export const requestLogin = async data => {
  return await baseAxios.post(`${API_URI.LOGIN}`, data);
};

// 회원 가입
export const requestSignup = async data => {
  return await baseAxios.post(`${API_URI.SIGN_UP}`, data);
};

// 아이디 중복 검사
export const requestIdCheck = async userId => {
  return await baseAxios.get(`${API_URI.ID_CHECK}`, {
    params: {
      userId: userId,
    },
  });
};

// 토큰 갱신
export const requestTokenRefresh = async () => {
  return await baseAxios.post(`${API_URI.REFRESH}`, {
    headers: {
      refreshToken: localStorage.getItem('refreshToken'),
    },
  });
};

export const requestAllMember = async () => {
  return baseAxios.get(`${API_URI.SHOW_MEMBER_ALL}`);
};

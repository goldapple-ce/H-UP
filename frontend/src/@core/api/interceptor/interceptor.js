import { requestTokenRefresh } from '@api/services/auth';
import { authAxios } from '..';

import Swal from 'sweetalert2';

function loginAlert() {
  Swal.fire({
    title: '로그인 필요',
    text: '로그인 후 이용해주세요.',
    icon: 'info',
    confirmButtonText: '확인',
  }).then(result => {
    if (result.isConfirmed) {
      window.location.href = '/login';
    }
  });
}

function loginAgainAlert() {
  Swal.fire({
    title: '로그인 필요',
    text: '다시 로그인해주세요.',
    icon: 'info',
    confirmButtonText: '확인',
  }).then(result => {
    if (result.isConfirmed) {
      window.location.href = '/login';
    }
  });
}

export default function interceptor(api) {
  requestInterceptor(api);
  responseInterceptor(api);
}

function requestInterceptor(instance) {
  instance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        loginAlert();
        return;
      }

      return config;
    },
    error => {
      console.log(error);
      return Promise.reject(error.response);
    },
  );
}

function errorAlert(errorMessage) {
  Swal.fire({
    title: '에러',
    text: errorMessage,
    icon: 'error',
    confirmButtonText: '확인',
  }).then(result => {
    if (result.isConfirmed) {
      window.history.back();
    }
  });
}

function responseInterceptor(instance) {
  console.log('response interceptor');
  instance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const originConfig = error.config;
      const { businessCode, errorMessage } = error.response.data;
      console.log('code : ' + businessCode);
      console.log('message : ' + errorMessage);
      const status = error.response.status;

      if (status === 401) {
        if (businessCode == 'AUTH004') {
          const { jwtToken } = await requestTokenRefresh().data;
          const { accessToken, refreshToken } = jwtToken;

          localStorage.setItem('accesstoken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          originConfig.headers = {
            'Content-Type': 'appication/json',
            Authorization: `Bearer ${jwtToken.accessToken}`,
          };
          return authAxios.request(originConfig);
        } else if (businessCode == 'AUTH005') {
          localStorage.clear();
          loginAgainAlert();
        }
      } else if (status == 400 || status == 404 || status == 409) {
        errorAlert(errorMessage);
      }
      return Promise.reject(error);
    },
  );
}

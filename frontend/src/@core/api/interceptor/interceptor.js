import { requestTokenRefresh } from '@api/services/auth';
import { authAxios } from '..';

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
        alert('로그인 후 이용해주세요');
        window.location.href = '/login';
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
          window.location.href = '/login';
          window.alert('다시 로그인 해주세요.');
        }
      } else if (status == 400 || status == 404 || status == 409) {
        window.alert(errorMessage);
      }
      return Promise.reject(error);
    },
  );
}

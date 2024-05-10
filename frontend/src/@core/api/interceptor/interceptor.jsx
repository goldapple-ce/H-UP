export default function interceptor(api) {
  addTokenOnRequest(api);
}

function addTokenOnRequest(instance) {
  instance.interceptors.request.use(
    config => {
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }else{
        alert('로그인 후 이용해주세요')
        window.location.href= '/login';
      }

      return config;
    },
    error => Promise.reject(error.response),
  );
}

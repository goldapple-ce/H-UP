export default function interceptor(api) {
  addTokenOnRequest(api);
}

function addTokenOnRequest(instance) {
  console.log(123);
  instance.interceptors.request.use(
    config => {
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        window.location.href = '/login';
        return;
      }

      return config;
    },
    error => Promise.reject(error.response),
  );
}

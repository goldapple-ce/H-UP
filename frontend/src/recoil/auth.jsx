import { atom } from 'recoil';

const authState = atom({
  key: 'authState',
  default: {
    isLogin: sessionStorage.getItem('accessToken') ? true : false,
    memberId: '',
  },
});

export { authState };

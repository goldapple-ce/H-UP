import { atom } from 'recoil';

const authState = atom({
  key: 'authState',
  default: {
    isLogin: false,
    memberId: '',
    jwtToken: {
      accessToken: '',
      refreshToken: '',
    },
  },
});

export { authState };

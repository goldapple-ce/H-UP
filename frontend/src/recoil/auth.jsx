import { atom } from 'recoil';

const authState = atom({
  key: 'authState',
  default: {
    memberId: '',
    jwtToken: {
      accessToken: '',
      refreshToken: '',
    },
  },
});

export { authState };

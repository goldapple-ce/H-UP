import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const authState = atom({
  key: 'authState',
  default: {
    isLogin: false,
    memberId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export { authState };

import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const infoState = atom({
  key: 'infoState',
  default: {
    teamId: 0,
    projectId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

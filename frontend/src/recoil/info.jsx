import { atom } from 'recoil';

export const infoState = atom({
  key: 'infoState',
  default: {
    teamId: 0,
    projectId: 0,
  },
});

import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'session-persist',
  storage: sessionStorage,
});

export const teamIdState = atom({
  key: 'teamIdState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const menuSidebarState = atom({
  key: 'menuSidebarState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const messengerSidebarState = atom({
  key: 'messengerSidebarState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

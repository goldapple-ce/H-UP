import { atom } from 'recoil';

export const kanbanListState = atom({
  key: 'kanbanState',
  default: [],
});
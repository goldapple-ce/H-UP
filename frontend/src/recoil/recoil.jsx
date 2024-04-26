import { atom } from 'recoil';

export const kanbanListState = atom({
  key: 'kanbanState',
  default: [],
});

export const MenuSidebarState = atom({
  key: 'MenuSideState',
  default: []
})

export const MessengerSidebarState = atom({
  key: 'MessengerSideState',
  default: []
})
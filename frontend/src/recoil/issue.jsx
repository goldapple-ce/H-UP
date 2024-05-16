import { atom } from 'recoil';

// 이슈 List에 대한 Atom
export const IssueListState = atom({
  key: 'IssueListState',
  default: [],
});
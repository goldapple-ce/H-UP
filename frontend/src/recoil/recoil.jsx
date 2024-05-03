import { atom, selector } from 'recoil';
import axios from 'axios'

// 이슈 List에 대한 Atom
export const issueListState = atom({
  key: "listState",
  default: [
    {
      id: 0,
      title: "title",
      content: 'content',
      category: '발의됨',
      imageList: [{
          id: 1,
          src: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          alt: 1,
      }, {
          id: 2,
          src: "https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80",
          alt: 2,
      }, {
          id: 3,
          src: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
          alt: 3,
      }, {
          id: 4,
          src: "https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          alt: 4,
      }]
    },
    {
      id: 1,
      title: "title",
      content: 'content',
      category: '선택됨',
      imageList: [{
          id: 1,
          src: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          alt: 1,
      }, {
          id: 2,
          src: "https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80",
          alt: 2,
      }]
    },
    {
      id: 2,
      title: "title",
      content: 'content',
      category: '완료',
      imageList: [{
          id: 1,
          src: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          alt: 1,
      }, {
          id: 4,
          src: "https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          alt: 4,
      }]
    },
  ],
});

// 이슈 List에 대한 Selector
export const fetchListState = selector({
  key: "fetchListState",
  // get: async () => {
  //   const response = await axios.get(
  //      `${process.env.REACT_APP_API_BASE_URL}/list`
  //     ``
  //   );
  //   const data = response.data;

  //   return data;
  // },
  get: ({get}) => {
    const list = get(issueListState);

  return list
}});

export const MenuSidebarState = atom({
  key: 'MenuSideState',
  default: []
})

export const MessengerSidebarState = atom({
  key: 'MessengerSideState',
  default: []
})


export const issueListFilterState = atom({
  key: 'issueListFilterState',
  default: 'Show All',
})

const filteredIssueListState = selector({
  key: 'filteredIssueListState',
  get: ({get}) => {
    const filter = get(issueListFilterState);
    const list = get(issueListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

// 캘린더 데이터에 대한 atom
export const calendarData = atom({
  key: 'calnderData',
  default: [],
});

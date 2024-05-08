import { atom, selector } from 'recoil';
import axios from 'axios'

// 이슈 List에 대한 Atom
export const issueListState = atom({
  key: "issueListState",
  default: [
    {
      issueId: 1,
      title: "title1",
      status: 'CREATED',
      startDate: new Date(2024, 3, 12, 10, 30, 0, 0),
      endDate: new Date(2024, 4, 12, 12, 30, 0, 0),
      memberInfo: [{
          id: 1,
          img: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          name: 1,
      }, {
          id: 2,
          img: "https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80",
          name: 2,
      }, {
          id: 3,
          img: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
          name: 3,
      }, {
          id: 4,
          img: "https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          name: 4,
      }]
    },
    {
      issueId: 2,
      title: "title2",
      status: 'PROGRESS',
      startDate: new Date(2024, 3, 23, 11, 30, 0, 0),
      endDate: new Date(2024, 4, 5, 15, 30, 0, 0),
      memberInfo: [{
          id: 1,
          img: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          name: 1,
      }, {
          id: 2,
          img: "https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80",
          name: 2,
      }]
    },
    {
      issueId: 3,
      title: "title3",
      status: 'COMPLETED',
      startDate: new Date(2024, 3, 4, 15, 30, 0, 0),
      endDate: new Date(2024, 4, 2, 10, 30, 0, 0),
      memberInfo: [{
          id: 1,
          img: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          name: 1,
      }, {
          id: 4,
          img: "https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
          name: 4,
      }]
    },
  ],
});

// 이슈 List에 대한 Selector
export const fetchListState = selector({
  key: "fetchListState",
  // get: async () => {
  //   const response = await axios.get(
  //     //  `${process.env.REACT_APP_API_BASE_URL}/api/issue/kb/a/1`
  //     `https://h-up.site/api/issue/kb/a/1`
  //   );
  //   const data = response.data;

  //   return data;
  // },
  get: ({get}) => {
    const list = get(issueListState);
    console.log(list)
  return list
  },
});

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

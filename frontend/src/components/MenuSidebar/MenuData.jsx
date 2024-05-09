import { People } from 'react-bootstrap-icons';

export const MenuData = [
  {
    title: '프로젝트 1',
    path: '/reports',
    // icon: <Folder2/>,
    // iconClosed: <FolderCheck/>,
    // iconOpened: <Folder2Open/>,

    subNav: [
      {
        id: 1,
        title: '이슈 1',
        // icon: 'IoIcons.IoIosPaper',
        cName: 'sub-nav',
      },
      {
        id: 2,
        title: '이슈 2',
        // icon: 'IoIcons.IoIosPaper',
        cName: 'sub-nav',
      },
      {
        id: 3,
        title: '이슈 3',
        path: '/issueId=3',
        // icon: 'IoIcons.IoIosPaper'
      },
    ],
  },
  {
    title: '프로젝트 2',
    path: '/reports',
    // icon: 'IoIcons.IoIosPaper',
    // iconClosed: 'RiIcons.RiArrowDownSFill',
    // iconOpened: 'RiIcons.RiArrowUpSFill',

    subNav: [
      {
        id: 1,
        title: '이슈 1',
        // icon: 'IoIcons.IoIosPaper',
        cName: 'sub-nav',
      },
      {
        id: 2,
        title: '이슈 2',
        // icon: 'IoIcons.IoIosPaper',
        cName: 'sub-nav',
      },
      {
        id: 3,
        title: '이슈 3',
        // icon: 'IoIcons.IoIosPaper'
      },
    ],
  },
  {
    title: 'Team',
    path: '/team',
    icon: <People />,
  },
];

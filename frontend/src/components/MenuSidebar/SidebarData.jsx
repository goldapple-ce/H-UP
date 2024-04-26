import React from 'react';
import { Folder2, Folder2Open, FolderCheck, People, file} from 'react-bootstrap-icons';

export const SidebarData = [
  {
    title: '프로젝트 1',
    path: '/reports',
    // icon: <Folder2/>,
    // iconClosed: <FolderCheck/>,
    // iconOpened: <Folder2Open/>,

    subNav: [
      {
        title: '이슈 1',
        path: '/issueId=1',
        // icon: 'IoIcons.IoIosPaper',
        cName: 'sub-nav'
      },
      {
        title: '이슈 2',
        path: '/issueId=2',
        // icon: 'IoIcons.IoIosPaper',
        cName: 'sub-nav'
      },
      {
        title: '이슈 3',
        path: '/issueId=3',
        // icon: 'IoIcons.IoIosPaper'
      }
    ]
  },
  {
    title: '프로젝트 2',
    path: '/reports',
    // icon: 'IoIcons.IoIosPaper',
    // iconClosed: 'RiIcons.RiArrowDownSFill',
    // iconOpened: 'RiIcons.RiArrowUpSFill',

    subNav: [
      {
        title: '이슈 1',
        path: '/issueId=1',
        // icon: 'IoIcons.IoIosPaper',
        cName: 'sub-nav'
      },
      {
        title: '이슈 2',
        path: '/issueId=2',
        // icon: 'IoIcons.IoIosPaper',
        cName: 'sub-nav'
      },
      {
        title: '이슈 3',
        path: '/issueId=3',
        // icon: 'IoIcons.IoIosPaper'
      }
    ]
  },
  {
    title: 'Team',
    path: '/team',
    icon: <People/>
  },
];

import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SubMenu.module.scss';

import { issueState } from '@recoil/issue';
import { useRecoilState } from 'recoil';
import { requestIssueList } from '@api/services/issue';

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const [issueList, setIssueList] = useState([]);

  const showSubnav = async (projectId) => {
    if (!subnav) {
      const response = await requestIssueList(projectId);
      setIssueList(response.data.issueInfoList)
    }
    setSubnav(!subnav);
  };

  return (
    <>
      <Link
        className={styles.sidebarLink}
        to={`/project/${item.id}`}
        onClick={() => {
          showSubnav(item.id);
        }}
      >
        <div>
          <div>
            <span className={styles.subMenuSpan}>{item.name}</span>
          </div>
          <div>
            {issueList && subnav
              ? item.iconOpened
              : issueList
                ? item.iconClosed
                : null}
          </div>
        </div>
      </Link>
      {subnav &&
        issueList.map((item, index) => {
          return (
            <Link
              key={index}
              className={styles.dropdownLink}
              to={`/issue/${item.issueId}`}
            >
              <span className={styles.subMenuSpan}>{item.title}</span>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;

{
  /* <Link
        className={styles.sidebarLink}
        to={item.path}
        onClick={item.subNav && showSubnav}
      >
        <div>
          <div>
            {item.icon}
            <subMenuSpan>{item.title}</subMenuSpan>
          </div>
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
                ? item.iconClosed
                : null}
          </div>
        </div>
      </Link>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link
              className={styles.dropdownLink}
              to={`issue/${item.id}`}
              key={index}
            >
              {item.icon}
              <subMenuSpan>{item.title}</subMenuSpan>
            </Link>
          );
        })} */
}

import { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SubMenu.module.scss';

import { issueState } from '@recoil/issue';
import { useRecoilState } from 'recoil';
import { requestIssueList } from '@api/services/issue';

const SubMenu = ({ item, activeSubMenuId, onSubMenuClick }) => {
  const [issueList, setIssueList] = useState([]);
  const subnav = activeSubMenuId === item.id;

  useLayoutEffect(() => {
    const fetchIssueList = async () => {
      if (subnav) {
        const response = await requestIssueList(item.id);
        setIssueList(response.data.issueInfoList);
      }
    };
    fetchIssueList();
  }, [subnav, item.id]);

  return (
    <>
      <Link
        className={styles.sidebarLink}
        to={`/project/${item.id}`}
        onClick={() => onSubMenuClick(item.id)}
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
      <div className={`${styles.dropdownContent} ${subnav ? styles.open : ''}`}>
        {subnav &&
          issueList.map((issue, index) => (
            <Link
              key={index}
              className={styles.dropdownLink}
              to={`/issue/${issue.issueId}`}
            >
              <span className={styles.subMenuSpan}>{issue.title}</span>
            </Link>
          ))}
      </div>
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

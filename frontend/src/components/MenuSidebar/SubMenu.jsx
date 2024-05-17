import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SubMenu.module.scss';
import { LoadProjectIssueList } from '@api/services/team';
import {useEffect} from 'react';
import { useRecoilState } from 'recoil';
import { IssueListState } from '@recoil/issue';

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const [issueList, setIssueList] = useRecoilState(IssueListState);

  const showSubnav = () => {setSubnav(!subnav)};

  const fetchData = async (e) => {
    try {
      const response = await LoadProjectIssueList(item.id); 
      const list = response.data.responseList;
        
      setIssueList(list);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Link
        className={styles.sidebarLink}
        to={`/project/${item.id}`}
        onClick={() => {
          showSubnav();
          fetchData();
        }}
      >
        <div>
          <div>
            <subMenuSpan>{item.name}</subMenuSpan>
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
                className={styles.dropdownLink}
                to={`/issue/${item.issueId}`}
                key={index}
              >
                <subMenuSpan>{item.title}</subMenuSpan>
              </Link>
            );
          })}
    </>
  );
};

export default SubMenu;



{/* <Link
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
        })} */}
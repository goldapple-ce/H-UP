import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SubMenu.module.scss';
import { LoadProjectIssueList } from '@api/services/team';
import {useEffect} from 'react';

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const [issueList, setIssueList] = useState([])

  const showSubnav = () => {setSubnav(!subnav)};

  const fetchData = async () => {
    const response = await LoadProjectIssueList(item.id); 

    setIssueList(response.data.responseList);
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <>
      <Link
        className={styles.sidebarLink}
        to={`/project/${item.id}`}
        onClick={issueList && showSubnav}
      >
        <div>
          <div>
            <span>{item.name}</span>
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
                <span>{item.title}</span>
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
            <span>{item.title}</span>
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
              <span>{item.title}</span>
            </Link>
          );
        })} */}
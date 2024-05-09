import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SubMenu.module.scss';

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <Link
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
        })}
    </>
  );
};

export default SubMenu;

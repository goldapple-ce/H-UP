import useLogout from '@hook/useLogout';
import { authState } from '@recoil/auth';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styles from './Navbar.module.scss';

import { menuSidebarState, messengerSidebarState } from '@recoil/commonPersist';
import { LogOut } from '@styled-icons/boxicons-regular/LogOut';
import { Menu } from '@styled-icons/boxicons-regular/Menu';
import { CommentDetail } from '@styled-icons/boxicons-solid/CommentDetail';
import IconButton from '../IconButton/IconButton';

const NavBar = () => {
  const [isOpen, setIsOpen] = useRecoilState(menuSidebarState);

  const [isMessengerOpen, setIsMessengerOpen] = useRecoilState(
    messengerSidebarState,
  );

  const ShowMenuSidebar = () => {
    setIsOpen(!isOpen);
  };

  const ShowMessengerSidebar = () => {
    setIsMessengerOpen(!isMessengerOpen);
  };

  const [userInfo] = useRecoilState(authState);

  const { logout } = useLogout();

  return (
    <nav>
      <div className={styles.nav_container}>
        <div>
          <IconButton toDo={ShowMenuSidebar}>
            <Menu />
          </IconButton>
        </div>
        <div>
          <Link to={userInfo.isLogin ? '/' : '/login'} className={styles.logo}>
            H•UP
          </Link>
        </div>
        <div
          className={`${styles.btn_container} ${userInfo.isLogin ? styles.visible : ''}`}
        >
          {/* <IconButton toDo={ShowMessengerSidebar}>
            <CommentDetail />
          </IconButton> */}
          <IconButton toDo={logout}>
            <LogOut />
          </IconButton>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

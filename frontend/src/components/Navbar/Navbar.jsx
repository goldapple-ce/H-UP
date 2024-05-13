import useLogout from '@hook/useLogout';
import { authState } from '@recoil/auth';
import { MenuSidebarState, MessengerSidebarState } from '@recoil/recoil';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styles from './Navbar.module.scss';

import IconButton from '../IconButton/IconButton';
import { LogOut } from '@styled-icons/boxicons-regular/LogOut';
import { CommentDetail } from '@styled-icons/boxicons-solid/CommentDetail';
import { Menu } from '@styled-icons/boxicons-regular/Menu';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(MenuSidebarState);

  const [isMessengerOpen, setIsMessengerOpen] = useRecoilState(MessengerSidebarState);

  const ShowMenuSidebar = () => {
    setIsMenuOpen(isMenuOpen ^ true);
  };

  const ShowMessengerSidebar = () => {
    setIsMessengerOpen(isMessengerOpen ^ true)
  };

  const [userInfo] = useRecoilState(authState);

  const { logout } = useLogout();

  return (
    <nav>
      <div className={styles.nav_container}>
          <Link to={userInfo.isLogin ? '/' : '/login'} className={styles.logo}>
            H•UP
          </Link>
          <div className={styles.btn_container} hidden={!userInfo.isLogin}>
            <IconButton toDo={ShowMenuSidebar}>
              <Menu />
            </IconButton>
            <IconButton toDo={ShowMessengerSidebar}>
              <CommentDetail />
            </IconButton>
            <IconButton toDo={logout}>
              <LogOut />
            </IconButton>
          </div>
        </div>
    </nav>
  )
};

export default NavBar;
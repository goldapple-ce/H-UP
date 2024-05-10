import useLogout from '@hook/useLogout';
import { authState } from '@recoil/auth';
import { MenuSidebarState, MessengerSidebarState } from '@recoil/recoil';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styles from './Navbar.module.scss';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(MenuSidebarState);

  const ShowMenuSidebar = () => {
    isMenuOpen === true ? setIsMenuOpen(false) : setIsMenuOpen(true);
  };

  const [isMessengerOpen, setIsMessengerOpen] = useRecoilState(
    MessengerSidebarState,
  );

  const ShowMessengerSidebar = () => {
    isMessengerOpen === true
      ? setIsMessengerOpen(false)
      : setIsMessengerOpen(true);
  };
  const [userInfo] = useRecoilState(authState);

  const { logout } = useLogout();

  if (userInfo.isLogin) {
    return (
      <nav>
        <ul>
          <li>
            <Link to='/' className={styles.logo}>
              H•UP
            </Link>
          </li>
          <li>
            <Link to='/'>Project</Link>
          </li>
          <li>
            <div className='btn' onClick={ShowMenuSidebar}>
              메뉴
            </div>
          </li>
          <li>
            <div className='btn' onClick={ShowMessengerSidebar}>
              메신저
            </div>
          </li>
          <li>
            <div className='btn' onClick={logout}>
              로그아웃
            </div>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <ul>
          <li>
            <Link to='/login' className={styles.logo}>
              H•UP
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default NavBar;

import useLogout from '@hook/useLogout';
import { authState } from '@recoil/auth';
import { MenuSidebarState, MessengerSidebarState } from '@recoil/recoil';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styles from './Navbar.module.scss';

import IconButton from '../IconButton/IconButton'
import { LogOut } from '@styled-icons/boxicons-regular/LogOut'
import { CommentDetail } from '@styled-icons/boxicons-solid/CommentDetail'
import { Menu } from '@styled-icons/boxicons-regular/Menu'
 
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
        <div className={styles.nav_container}>
          <Link to='/' className={styles.logo}>
            H•UP
          </Link>
          <div classNAme={styles.btn_container}>
            <div className='btn'>
              <IconButton toDo={ShowMenuSidebar}>
                <Menu />
              </IconButton>
            </div>
            <div className='btn'>
              <IconButton toDo={ShowMessengerSidebar}>
                <CommentDetail />
              </IconButton>
            </div>
            <div className='btn'>
              <IconButton toDo={() => {
                setUserInfo({
                  memberId: '',
                  jwtToken: {
                    accessToken: '',
                    refreshToken: '',
                  },
                });
                navigate('/login');
              }}>
              <LogOut />
              </IconButton>
            </div>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav>
        <div className={styles.nav_container}>
          <Link to='/login' className={styles.logo}>
            H•UP
          </Link>
        </div>
      </nav>
    );
  }
};

export default NavBar;

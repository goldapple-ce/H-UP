import useLogout from '@hook/useLogout';
import { authState } from '@recoil/auth';
import { menuSidebarState } from '@recoil/commonPersist';
import { LogOut, Menu, LogIn } from '@styled-icons/boxicons-regular';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import IconButton from '../IconButton/IconButton';
import styles from './Navbar.module.scss';

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useRecoilState(menuSidebarState);

  const ShowMenuSidebar = () => {
    setIsOpen(!isOpen);
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
          <Link to='/' className={styles.logo}>
            H•UP
          </Link>
        </div>
        <div className={styles.btn_container}>
          {userInfo.isLogin ? (
            <IconButton toDo={logout}>
              <LogOut />
            </IconButton>
          ) : (
            <IconButton toDo={() => navigate('/login')}>
              <LogIn />
            </IconButton>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

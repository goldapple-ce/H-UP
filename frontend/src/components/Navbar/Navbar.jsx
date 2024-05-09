import { authState } from '@recoil/auth';
import { MenuSidebarState, MessengerSidebarState } from '@recoil/recoil';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import './Navbar.module.scss';

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
  const { userInfo, setUserInfo } = useRecoilState(authState);
  const navigate = useNavigate();

  if (userInfo.accessToken) {
    return (
      <nav>
        <ul>
          <li>
            <Link to='/' className='logo'>
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
            <div
              className='btn'
              onClick={() => {
                setUserInfo('');
                navigate('/LoginPage');
              }}
            >
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
            <Link to='/LoginPage' className='logo'>
              H•UP
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default NavBar;

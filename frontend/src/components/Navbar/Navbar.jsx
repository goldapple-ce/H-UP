import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice'
import './Navbar.module.scss'
import { useRecoilState } from "recoil";
import { MenuSidebarState, MessengerSidebarState } from '../../recoil/recoil';


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(MenuSidebarState);

  const ShowMenuSidebar = () => {
      isMenuOpen === true ? setIsMenuOpen(false) : setIsMenuOpen(true);
  }

  const [isMessengerOpen, setIsMessengerOpen] = useRecoilState(MessengerSidebarState);

  const ShowMessengerSidebar = () => {
      isMessengerOpen === true ? setIsMessengerOpen(false) : setIsMessengerOpen(true);
  }

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return (
      <nav>
        <ul>
          <li><Link to="/ProjectPage" className="navbar-brand text-primary mr-0">H-UP</Link></li>
          {/* <li><Link to="/ProjectPage" className="navbar-brand text-secondary mr-0">Home</Link></li> */}
          <li><Link to="/ProjectPage" className="navbar-brand text-secondary mr-0">Project</Link></li>
          <li><Link to="/IssuePage"className="navbar-brand text-secondary mr-0">Issue</Link></li>
          <li><div className="btn" onClick={ShowMenuSidebar}>메뉴</div></li>
          <li><div className="btn" onClick={ShowMessengerSidebar}>메신저</div></li>
          <li><div className="btn" onClick={()=> {dispatch(logout()); navigate('/')}}>로그아웃</div></li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <ul>
          <li><Link to="/" className="navbar-brand text-primary mr-0">H-UP</Link></li>
        </ul>
      </nav>
    );
  }
  
};

export default NavBar;
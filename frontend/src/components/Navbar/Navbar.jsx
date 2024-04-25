import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.module.scss'

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/ProjectPage">Project</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
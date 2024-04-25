import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.module.scss'

const NavBar = () => {

  return (
    <nav>
      <ul>
        <li><Link to="/" className="navbar-brand text-primary mr-0">H-UP</Link></li>
        <li><Link to="/" className="navbar-brand text-secondary mr-0">Home</Link></li>
        <li><Link to="/ProjectPage" className="navbar-brand text-secondary mr-0">Project</Link></li>
        <li><Link to="/IssuePage"className="navbar-brand text-secondary mr-0">Issue</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
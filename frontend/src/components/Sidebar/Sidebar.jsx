import React, {useState} from "react";
import styles from "./Sidebar.module.scss";
import { Link } from 'react-router-dom';
import {List} from 'react-bootstrap-icons';

const Sidebar = () => {
  const [isOpen, setIsopen] = useState(true);

  const Sidebar = () => {
      isOpen === true ? setIsopen(false) : setIsopen(true);
  }
  return (
      <>
          <div className="bar-container">
            <div className={`${styles.sidebar} ${isOpen == true ? styles.active : ''}`}>
              <div className={styles.sd_header}>
                  <h4 className="mb-0">사이드 바</h4>
                  <div className="btn" onClick={Sidebar}><List/></div>
              </div>
              <div className={styles.sd_body}>
                  <ul>
                      <li><a className={styles.sd_link}>Menu Item 1</a></li>
                      <li><a className={styles.sd_link}>Menu Item 2</a></li>
                      <li><a className={styles.sd_link}>Menu Item 3</a></li>
                      <li><a className={styles.sd_link}>Menu Item 4</a></li>
                      <li><a className={styles.sd_link}>Menu Item 5</a></li>
                      <li><a className={styles.sd_link}>Menu Item 6</a></li>
                      <li><a className={styles.sd_link}>Menu Item 7</a></li>
                      <li><a className={styles.sd_link}>Menu Item 8</a></li>
                  </ul>
              </div>
            </div>
            <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={Sidebar}></div>
         </div>
         
      </>
  )
}

export default Sidebar
import React, {useState} from "react";
import styles from "./bar.module.scss";
// import { ArchiveFill, MicFill, CameraVideo, Inboxes, Bell, PersonCircle } from 'react-bootstrap-icons';

const Sidebar = (props) => {

  const isOpen = props.isOpen ? "sidebar open" : "sidebar closed"

  return (
    <div>
      타이틀
      <ul>
        <li>
          item1
        </li>
        <li>
          item2
        </li>
        <li>
          item3
        </li>
      </ul>
      {isOpen && <div className={styles.content}>children</div>}
    </div>
  );
}

export default Sidebar

import { messengerSidebarState } from '@recoil/commonPersist';
import { useState } from 'react';
import { List } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { MessengerData } from './MessengerData';
import styles from './MessengerSidebar.module.scss';

const MessengerSidebar = (
  {
    //   users,
    //   activeUserId,
    //   onUserClick,
  },
) => {
  const [isOpen, setIsopen] = useRecoilState(messengerSidebarState);

  const ShowSidebar = () => {
    setIsopen(!isOpen);
  };

  const activeUserId = 1;

  const [htmlContent, setHtmlContent] = useState(''); // State variable for HTML content

  const handleButtonClick = () => {
    const newHtml = '<div><h2>Dynamically Added HTML</h2></div>'; // Dynamic HTML content
    setHtmlContent(newHtml); // Update state with new HTML
  };

  return (
    <div className='bar-container'>
      <div
        className={`${styles.sidebar} ${isOpen == true ? styles.active : ''}`}
      >
        <div className={styles.sd_header}>
          <div className='btn' onClick={ShowSidebar}>
            <List />
          </div>
          <h4 className='mb-0'>Chat Room</h4>
        </div>
        <div className={styles.sd_body}>
          <ul>
            {MessengerData.map(user => (
              <li
                key={user.id}
                className={activeUserId === user.id ? 'active' : ''}
              >
                <Link to={`/chat/${user.id}`}>
                  {' '}
                  {/* Replace with your chat routing */}
                  <div className={styles.userInfo}>
                    <img src={user.avatar} alt={user.name} />
                    <sidebarSpan>{user.name}</sidebarSpan>
                    {/* <ChatDots className={styles.chatdots}/> */}
                  </div>
                </Link>
                {/* <button onClick={() => onUserClick(user.id)}>Message</button> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`}
        onClick={ShowSidebar}
      ></div>
    </div>
  );
};

export default MessengerSidebar;

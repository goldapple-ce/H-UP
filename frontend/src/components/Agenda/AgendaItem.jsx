import { useState } from 'react';
import { CaretRightFill } from 'react-bootstrap-icons';
import playIcon from '@asset/img/play_icon.png';
import styles from './AgendaItem.module.scss';

const AgendaItem = ({ agenda, onClick }) => {
  const { id, content, createdAt, requester, assigneeList } = agenda;
  const [iconImage, setIconImage] = useState('');

  const formatToDate = jsDateStr => {
    const date = new Date(jsDateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // const hour = date.getHours();
    // const minutes = date.getMinutes();
    // const formattedDate = `${year}년 ${month}월 ${day}일 ${hour}:${minutes}`;
    const formattedDate = `${year}. ${month}. ${day}`;
    return formattedDate;
  };

  return (
    <div className={styles.agenda} onClick={onClick}>
      <img src={playIcon} alt='' />
        <div>
          <h5>{content}</h5>
          {/* <span>요청자 :{requester.name}</span> */}
        </div>
      <ul>
        <p>{formatToDate(createdAt)}</p>
      </ul>
      <img
        className={styles.agenda__requester}
        key={requester.id}
        src='https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
        alt={requester.name}
      />
      <CaretRightFill className={styles.caret}/>
      <div className={styles.agenda__assignee_list}>
        {assigneeList.map(assignee => (
          <img
            className={styles.agenda__assignee}
            key={assignee.id}
            src='https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
            alt={assignee.name}
          />
        ))}
      </div>
    </div>
  );
};

export default AgendaItem;

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
      <h5>{content}</h5>
      <ul>
        <p>{formatToDate(createdAt)}</p>
      </ul>
      <img
        className={styles.agenda__requester}
        key={requester.id}
        src={requester.img}
        alt={requester.name}
      />
      <CaretRightFill />
      {assigneeList.map(assignee => (
        <img
          className={styles.agenda__assignee}
          key={assignee.id}
          src={assignee.img}
          alt={assignee.name}
        />
      ))}
    </div>
  );
};

export default AgendaItem;

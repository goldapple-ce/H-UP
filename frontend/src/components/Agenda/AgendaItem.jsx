import { useState } from 'react';
import { CaretRightFill } from 'react-bootstrap-icons';
import playIcon from '@asset/img/play_icon.png';
import styles from './AgendaItem.module.scss';
import { deleteAgenda } from '@api/services/agenda';
import { FaPencilAlt, FaTimes, FaUser } from 'react-icons/fa'; // 아이콘 추가
import UserIcon from '@component/common/UserIcon';
import IconButton from '@component/IconButton/IconButton';
import { DeleteOutline } from 'styled-icons/material';

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

  const handledelete = async () => {
    await deleteAgenda(id);
  };

  return (
    <div className={styles.agenda} onClick={onClick}>
      <div className={styles.icon}>
        <img src={playIcon} alt='' />
      </div>
      <div className={styles.content}>
        <h5>{content}</h5>
      </div>
      <div className={styles.date}>
        <p>{formatToDate(createdAt)}</p>
      </div>
      <div className={styles.info_container}>
        <UserIcon src={requester.img} alt={requester.name} />
        <CaretRightFill className={styles.caret} />
        {assigneeList.length > 0 &&
          assigneeList.map(assignee => (
            <UserIcon
              key={assignee.id}
              src={assignee.img}
              alt={assignee.name}
            />
          ))}
      </div>
      <div className={styles.delete_button}>
        <IconButton>
          <DeleteOutline />
        </IconButton>
      </div>
    </div>
  );
};

export default AgendaItem;

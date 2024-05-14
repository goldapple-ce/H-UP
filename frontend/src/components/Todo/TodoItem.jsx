import { useState } from 'react';
import playIcon from '@asset/img/play_icon.png';
import styles from './TodoItem.module.scss';

const TodoItem = ({ Todo }) => {
  // const { todoId, content, createdAt, endAt, requester, assigneeList } = Todo;
  const { todoId, content, createdAt, endAt, requester, assigneeList } = Todo;
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
    <div className={styles.Todo}>
      <img src={playIcon} alt='' />
      <h5>{content}</h5>
      <ul>
        <p>{formatToDate(createdAt)} ~ {formatToDate(endAt)}</p>
      </ul>
      {assigneeList.map(assignee => (
        <img
          className={styles.Todo__assignee}
          key={assignee.id}
          src={assignee.img}
          alt={assignee.name}
        />
      ))}
    </div>
  );
};

export default TodoItem;

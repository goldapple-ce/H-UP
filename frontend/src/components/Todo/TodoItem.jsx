import playIcon from '@asset/img/play_icon.png';
import UserIcon from '@component/common/UserIcon';
import { useState } from 'react';
import styles from './TodoItem.module.scss';

const TodoItem = ({ todo }) => {
  const { todoId, content, status, requesterInfo, assigneeInfo } = todo;
  const [iconImage, setIconImage] = useState('');

  // const formatToDate = jsDateStr => {
  //   const date = new Date(jsDateStr);
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   // const hour = date.getHours();
  //   // const minutes = date.getMinutes();
  //   // const formattedDate = `${year}년 ${month}월 ${day}일 ${hour}:${minutes}`;
  //   const formattedDate = `${year}. ${month}. ${day}`;
  //   return formattedDate;
  // };

  return (
    <div className={styles.Todo}>
      <img src={playIcon} alt='' />
      <h5>{content}</h5>
      <ul>
        {/* <p>{formatToDate(createdAt)} ~ {formatToDate(endAt)}</p> */}
      </ul>
      {assigneeList.map(assignee => (
        <img
          className={styles.Todo__assignee}
          key={assignee.id}
          src={assignee.img ? assignee.img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTBMWAdByZhgGVn9XczgDSm6qIfh6c5HaXYrFXGGcJTcOZRK4Qj9A09gE1cw&s'}
          alt={assignee.name}
        />
        <UserIcon
          className={styles.Todo__assignee}
          key={assigneeInfo.id}
          src={assigneeInfo.img}
          alt={assigneeInfo.name}
        />
      </div>
    </div>
  );
};

export default TodoItem;

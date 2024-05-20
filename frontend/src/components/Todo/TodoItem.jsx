import { requestDeleteTodo } from '@api/services/todo';
import playIcon from '@asset/img/play_icon.png';
import UserIcon from '@component/common/UserIcon';
import { CaretRightFill } from 'react-bootstrap-icons';
import { FaTimes } from 'react-icons/fa';
import styles from './TodoItem.module.scss';

const TodoItem = ({ todo }) => {
  const { content, requesterInfo, assigneeInfo } = todo;

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

  // 삭제
  const handleDelete = async e => {
    e.stopPropagation(); // 부모 요소의 클릭 이벤트를 막기 위해
    // 삭제 버튼 클릭 시 수행할 작업
    try {
      await requestDeleteTodo(todo.todoId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.Todo}>
        <div className={styles.left_container}>
          <img src={playIcon} alt='' />
          <div className={styles.h5}> {content} </div>
        </div>
        <div className={styles.right_container}>
          <div className={styles.date}>
            {formatToDate(todo.issueInfo.startDate)}
          </div>
          <div>
            <UserIcon
              className={styles.Todo__assignee}
              key={requesterInfo.id}
              src={requesterInfo.img}
              alt={requesterInfo.name}
            />
            <CaretRightFill className={styles.caret} />
            <UserIcon
              key={assigneeInfo.id}
              src={assigneeInfo.img}
              alt={assigneeInfo.name}
            />
          </div>
          <div className={styles.buttons}>
            <button className={styles.deleteButton} onClick={handleDelete}>
              <FaTimes />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoItem;

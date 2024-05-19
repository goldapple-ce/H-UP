import { todoState } from '@recoil/todo';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './Todo.module.scss';
import TodoItem from './TodoItem';

export default function Todo() {
  const [todoList] = useRecoilState(todoState);
  const [newList, setNewList] = useState([]);

  useEffect(() => {
    const isImminent = todo => {
      if (todo.issueInfo.endDate) {
        const endDate = new Date(todo.issueInfo.endDate);
        const today = new Date();
        const timeDiff = endDate - today;
        const daysLeft = timeDiff / (1000 * 60 * 60 * 24);
        return daysLeft <= 2 && todo.status != 'COMPLETED';
      }

      return false;
    };

    const filtering = async () => {
      setNewList(todoList.filter(todo => isImminent(todo)));
    };

    if (Array.isArray(todoList) && todoList.length > 0) filtering();
  }, [todoList]);

  return (
    <div className={styles.todo}>
      <div className={styles.todo__column1}>
        <ul className={styles.todo__list}>
          {todoList &&
            todoList?.map(todo => (
              <li key={todo.todoId}>
                <TodoItem todo={todo} />
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.todo__column2}>
        <h4>마감이 임박한 할일</h4>
        <ul className={styles.todo__imminent_list}>
          {newList &&
            newList?.map(todo => (
              <li key={todo.todoId}>
                <TodoItem todo={todo} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

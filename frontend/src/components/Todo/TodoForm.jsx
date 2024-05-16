import { todoState } from '@recoil/todo';
import styles from './TodoForm.module.scss';
import TodoItemContainer from './TodoItemContainer';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

const TodoForm = () => {
  const [todoList] = useRecoilState(todoState);
  const [newList, setNewList] = useState([]);

  useEffect(() => {
    // setNewList(todoList.filter(todo => todo.createdAt >= new Date()));
  }, [todoList]);

  return (
    todoList && (
      <div className={styles.Todo}>
        <div className={styles.Todo__column1}>
          <ul className={styles.Todo__list}>
            {todoList.map(todo => (
              <li key={todo.todoId}>
                <TodoItemContainer todo={todo} />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.Todo__column2}>
          <h4>마감이 임박한 할일</h4>
          <ul className={styles.Todo__new_list}>
            {newList.map(todo => (
              <li key={todo.todoId}>
                <TodoItemContainer todo={todo} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default TodoForm;

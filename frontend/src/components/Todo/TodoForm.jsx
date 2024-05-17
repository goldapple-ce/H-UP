import { todoState } from '@recoil/todo';
import styles from './TodoForm.module.scss';
import TodoItemContainer from './TodoItemContainer';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

const TodoForm = ({ TodoList, setTodoList, projectId }) => {
  const newList = TodoList.filter(Todo => Todo.createdAt >= new Date());

  return (
    <div className={styles.Todo}>
      <div className={styles.Todo__column1}>
        <ul className={styles.Todo__list}>
          {TodoList.map(Todo => (
            <li key={Todo.todoId}>
              <TodoItemContainer
                Todo={Todo}
                setTodoList={setTodoList}
                projectId={projectId}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.Todo__column2}>
        <h4>마감이 임박한 할일</h4>
        <ul className={styles.Todo__new_list}>
          {newList.map(Todo => (
            <li key={Todo.todoId}>
              <TodoItemContainer
                Todo={Todo}
                setTodoList={setTodoList}
                projectId={projectId}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoForm;

import { todoState } from '@recoil/todo';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styles from './Todo.module.scss';
import TodoForm from './TodoForm';

export default function Todo() {
  const [todoList] = useRecoilState(todoState);
  const { projectId } = useParams();

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  return (
    todoList && (
      <div className={styles.Todo}>
        <TodoForm todoList={todoList} projectId={projectId} />
      </div>
    )
  );
}

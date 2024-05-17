import { requestProjectMemberList } from '@api/services/project';
import { requestTodoList } from '@api/services/todo';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styles from './Todo.module.scss';
import TodoForm from './TodoForm';
import { todoState } from '@recoil/todo';

export default function Todo() {
  const [todoList, setTodoList] = useRecoilState(todoState);
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

import { useRecoilState } from 'recoil';
import { TodoListState } from '@recoil/Todo';
import styles from './Todo.module.scss';
import TodoForm from './TodoForm';

const Todo = () => {
  const memberId = 2;
  const [TodoList, setTodoList] = useRecoilState(TodoListState);
  // const TodoSubmitList = TodoList.filter(
  //   Todo => Todo.requester.id === memberId,
  // );
  // const TodoSendList = TodoList.reduce((list, data) => {
  //   if (data.assigneeList.some(assignee => assignee.id === memberId)) {
  //     list.push(data);
  //   }
  //   return list;
  // }, []);

  return (
    <div className={styles.Todo}>
        <TodoForm TodoList={TodoList} />
    </div>
  );
};

export default Todo;

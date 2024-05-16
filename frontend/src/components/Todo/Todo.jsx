import { todoState } from '@recoil/todo';
import { useRecoilState } from 'recoil';
import styles from './Todo.module.scss';
import TodoForm from './TodoForm';

export default function Todo() {
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
      <TodoForm />
    </div>
  );
}

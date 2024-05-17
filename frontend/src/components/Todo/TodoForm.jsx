import styles from './TodoForm.module.scss';
import TodoItemContainer from './TodoItemContainer';

const TodoForm = ({ todoList, projectId }) => {
  console.log(todoList);
  return (
    todoList && (
      <div className={styles.Todo}>
        <div className={styles.Todo__column1}>
          <ul className={styles.Todo__list}>
            {todoList.map(todo => (
              <li key={todo.todoId}>
                <TodoItemContainer todo={todo} projectId={projectId} />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.Todo__column2}>
          <h4>마감이 임박한 할일</h4>
          {/* <ul className={styles.Todo__new_list}>
          {newList.map(Todo => (
            <li key={Todo.todoId}>
              <TodoItemContainer todo={Todo} projectId={projectId} />
            </li>
          ))}
        </ul> */}
        </div>
      </div>
    )
  );
};

export default TodoForm;

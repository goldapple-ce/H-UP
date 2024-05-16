import { useNavigate } from 'react-router-dom';
import TodoItem from './TodoItem';

const TodoItemContainer = ({ todo }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/Todo/${todo.todoId}`);
  };
  return <TodoItem todo={todo} />;
};

export default TodoItemContainer;

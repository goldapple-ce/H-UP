import { useNavigate } from 'react-router-dom';
import TodoItem from './TodoItem';

const TodoItemContainer = ({ Todo }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/Todo/${Todo.id}`);
  };
  return <TodoItem Todo={Todo} />;
};

export default TodoItemContainer;

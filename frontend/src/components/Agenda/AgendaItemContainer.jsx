import { useNavigate } from 'react-router-dom';
import AgendaItem from './AgendaItem';

const AgendaItemContainer = ({ agenda }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/agenda/${agenda.id}`);
  };
  return <AgendaItem agenda={agenda} onClick={handleClick} />;
};

export default AgendaItemContainer;

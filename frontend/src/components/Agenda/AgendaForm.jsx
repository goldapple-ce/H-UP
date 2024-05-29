import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AgendaForm.module.scss';
import AgendaItem from './AgendaItem';

const AgendaForm = ({ agendaList }) => {
  const navigate = useNavigate();
  const [newList, setNewList] = useState([]);
  const handleClick = agendaId => {
    navigate(`/agenda/${agendaId}`);
  };

  useEffect(() => {
    function fetchAgendaList() {
      const currentDate = new Date();
      const filteredAgendaList = agendaList.filter(
        agenda => new Date(agenda.createdAt) >= currentDate,
      );
      setNewList(filteredAgendaList);
    }

    if (Array.isArray(agendaList) && agendaList.length) {
      fetchAgendaList();
    }
  }, [agendaList]);
  return (
    <div className={styles.agenda}>
      <div className={styles.agenda__column1}>
        <ul className={styles.agenda__list}>
          {agendaList &&
            agendaList.length > 0 &&
            agendaList.map(data => (
              <li key={data.agenda.id}>
                <AgendaItem
                  agenda={data.agenda}
                  onClick={() => handleClick(data.agenda.id)}
                />
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.agenda__column2}>
        <h4>마감이 임박한 의사결정</h4>
        <ul className={styles.agenda__new_list}>
          {newList &&
            newList.length > 0 &&
            newList.map(data => (
              <li key={data.agenda.id}>
                <AgendaItem
                  agenda={data.agenda}
                  onClick={() => handleClick(data.agenda.id)}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AgendaForm;

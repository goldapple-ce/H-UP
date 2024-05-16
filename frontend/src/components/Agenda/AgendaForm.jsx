import styles from './AgendaForm.module.scss';
import AgendaItemContainer from './AgendaItemContainer';

const AgendaForm = ({ agendaList }) => {
  const newList = agendaList.filter(agenda => agenda.createdAt >= new Date());

  return (
    <div className={styles.agenda}>
      <div className={styles.agenda__column1}>
        <ul className={styles.agenda__list}>
          {agendaList.map(data => (
            <li key={data.agenda.id}>
              <AgendaItemContainer agenda={data.agenda} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.agenda__column2}>
        <h4>마감이 임박한 의사결정</h4>
        <ul className={styles.agenda__new_list}>
          {newList.map(data => (
            <li key={data.agenda.id}>
              <AgendaItemContainer agenda={data.agenda} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AgendaForm;

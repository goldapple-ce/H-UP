import { useRecoilState } from 'recoil';
import { AgendaListState } from '@recoil/agenda';
import styles from './Agenda.module.scss';
import AgendaForm from './AgendaForm';
import { useEffect } from 'react';
import { LoadAgendaList } from '@api/services/agenda';
import { useParams } from 'react-router-dom';

const Agenda = () => {
  const memberId = 2;
  const [agendaList, setAgendaList] = useRecoilState(AgendaListState);

  const {id} = useParams();

  // Team 리스트 불러오기
  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await LoadAgendaList(id);
        const agendaData = response.data.agendaList;
        console.log(agendaData)
        setAgendaList(agendaData);

      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, []);


  const agendaSubmitList = agendaList.filter(
    data => data.agenda.requester.id === memberId,
  );
  const agendaSendList = agendaList.reduce((list, data) => {
    if (data.agenda.assigneeList.some(assignee => assignee.id === memberId)) {
      list.push(data);
    }
    return list;
  }, []);

  return (
    <div className={styles.agenda}>
      <div className={styles.tab__group}>
        {/* 받은 의사결정 탭 */}
        <div className={styles.tab}>
          <input
            className={styles.tab__radio}
            type='radio'
            id='tab-4-1'
            name='tab-group-4'
          />
          <label className={styles.tab__label} htmlFor='tab-4-1'>
            받은 의사결정
          </label>
          <div className={styles.tab__content}>
            <AgendaForm agendaList={agendaSubmitList} />
          </div>
        </div>

        {/* 요청한 의사결정 탭 */}
        <div className={styles.tab}>
          <input
            className={styles.tab__radio}
            type='radio'
            id='tab-4-2'
            name='tab-group-4'
          />
          <label className={styles.tab__label} htmlFor='tab-4-2'>
            요청한 의사결정
          </label>

          <div className={styles.tab__content}>
            <AgendaForm agendaList={agendaSendList} />
          </div>
        </div>

        {/* 전체 의사결정 탭 */}
        <div className={styles.tab}>
          <input
            className={styles.tab__radio}
            type='radio'
            id='tab-4-3'
            name='tab-group-4'
          />
          <label className={styles.tab__label} htmlFor='tab-4-3'>
            전체 의사결정
          </label>

          <div className={styles.tab__content}>
            <AgendaForm agendaList={agendaList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;

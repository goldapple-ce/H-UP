import { requestAgendaList } from '@api/services/agenda';
import { agendaState } from '@recoil/agenda';
import { authState } from '@recoil/auth';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styles from './Agenda.module.scss';
import AgendaForm from './AgendaForm';

export default function Agenda() {
  const [agendaList, setAgendaList] = useRecoilState(agendaState);
  const [userInfo] = useRecoilState(authState);

  const memberId = userInfo.memberId;
  const { id } = useParams();

  // Team 리스트 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestAgendaList(id);
        const agendaData = response.data.agendaList;
        setAgendaList(agendaData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const agendaSubmittedList = agendaList.filter(
    data => data.agenda.requester.id === memberId,
  );
  const agendaReceivedList = agendaList.reduce((list, data) => {
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
            <AgendaForm agendaList={agendaReceivedList} />
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
            <AgendaForm agendaList={agendaSubmittedList} />
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
}

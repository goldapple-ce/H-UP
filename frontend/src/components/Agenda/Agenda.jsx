import { agendaState } from '@recoil/agenda';
import { useRecoilState } from 'recoil';
import styles from './Agenda.module.scss';
import AgendaForm from './AgendaForm';

export default function Agenda() {
  const memberId = 2;
  const [agendaList] = useRecoilState(agendaState);
  const agendaSubmitList = agendaList.filter(
    agenda => agenda.requester.id === memberId,
  );
  const agendaSendList = agendaList.reduce((list, data) => {
    if (data.assigneeList.some(assignee => assignee.id === memberId)) {
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
}

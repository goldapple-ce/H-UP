import Tab from '@component/MainTab/Tab';
import { agendaState } from '@recoil/agenda';
import { authState } from '@recoil/auth';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './Agenda.module.scss';
import AgendaForm from './AgendaForm';

export default function Agenda() {
  const [agendaList] = useRecoilState(agendaState);
  const [newAgendaList, setNewAgendaList] = useState([]);
  const [userInfo] = useRecoilState(authState);
  const [activeTab, setActiveTab] = useState(1);

  const memberId = userInfo.memberId;

  useEffect(() => {
    if (Array.isArray(agendaList) && agendaList.length > 0) {
      switch (activeTab) {
        case 1:
          setNewAgendaList(agendaList);
          break;
        case 2:
          setNewAgendaList(
            agendaList.filter(data => data.agenda.requester.id === memberId),
          );
          break;
        case 3:
          setNewAgendaList(
            agendaList.filter(data =>
              data.agenda.assigneeList.some(
                assignee => assignee.id === memberId,
              ),
            ),
          );
          break;
        default:
          break;
      }
    }
  }, [agendaList, activeTab]);

  const handleTabContent = tab => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.agenda}>
      <div className={styles.tab__group}>
        <Tab
          groupId='4'
          id='1'
          name='전체 의사결정'
          onClick={() => handleTabContent(1)}
          setDefault={true}
        ></Tab>
        <Tab
          groupId='4'
          id='2'
          name='요청한 의사결정'
          onClick={() => handleTabContent(2)}
        ></Tab>
        <Tab
          groupId='4'
          id='3'
          name='받은 의사결정'
          onClick={() => handleTabContent(3)}
        ></Tab>
      </div>
      <div className={styles.tab__content}>
        <AgendaForm agendaList={newAgendaList} />
      </div>
    </div>
  );
}

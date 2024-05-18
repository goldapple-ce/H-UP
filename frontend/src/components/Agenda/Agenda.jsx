import { AddAgendaAssignee, createAgenda, requestAgendaList } from '@api/services/agenda';
import { agendaState } from '@recoil/agenda';
import { authState } from '@recoil/auth';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styles from './Agenda.module.scss';
import Modal from 'react-modal';
import IssueAddButton from '@component/IssueAddButton/IssueAddButton';
import { requestProjectMemberList } from '@api/services/project';
import { FaTimes } from 'react-icons/fa'; // 아이콘 추가
import AgendaForm from './AgendaForm';
import Tab from '@component/MainTab/Tab';
import { requestIssueList } from '@api/services/issue';

export default function Agenda() {
  const [agendaList] = useRecoilState(agendaState);
  const [agendaSubmittedList, setAgendaSubmittedList] = useState([]);
  const [agendaReceivedList, setAgendaReceivedList] = useState([]);
  const [userInfo] = useRecoilState(authState);
  const [teamMembers, setTeamMembers] = useState([]);

  const memberId = userInfo.memberId;
  const {id} = useParams();

  useEffect(() => {
    if (Array.isArray(agendaList) && agendaList.length > 0) {
      setAgendaSubmittedList(
        agendaList.filter(data => data.agenda.requester.id === memberId),
      );
      setAgendaReceivedList(
        agendaList.filter(data =>
          data.agenda.assigneeList.some(assignee => assignee.id === memberId),
        ),
      );
    }
  }, [agendaList, memberId]);

  return (
          <div className={styles.agenda}>
      <div className={styles.tab__group}>
        <Tab groupId='4' id='1' name='전체 의사결정' setDefault={true}>
          <AgendaForm agendaList={agendaList} />
        </Tab>
        <Tab groupId='4' id='2' name='요청한 의사결정'>
          <AgendaForm agendaList={agendaSubmittedList} />
        </Tab>
        <Tab groupId='4' id='3' name='받은 의사결정'>
          <AgendaForm agendaList={agendaReceivedList} />
        </Tab>

      </div>

    </div>
  );
}

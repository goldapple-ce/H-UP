import { AddAgendaAssignee, createAgenda, requestAgendaList } from '@api/services/agenda';
import { agendaState } from '@recoil/agenda';
import { authState } from '@recoil/auth';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styles from './Agenda.module.scss';
import AgendaForm from './AgendaForm';
import Modal from 'react-modal';
import IssueAddButton from '@component/IssueAddButton/IssueAddButton';
import { requestProjectMemberList } from '@api/services/project';
import { FaTimes } from 'react-icons/fa'; // 아이콘 추가
import { requestIssueList } from '@api/services/issue';
import { useEffect, useState } from 'react';
import Tab from '@component/MainTab/Tab';

export default function Agenda() {
  const [agendaList] = useRecoilState(agendaState);
  const [agendaSubmittedList, setAgendaSubmittedList] = useState([]);
  const [agendaReceivedList, setAgendaReceivedList] = useState([]);
  const [userInfo] = useRecoilState(authState);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [agendaContent, setAgendaContent] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [issueList, setIssueList] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const memberId = userInfo.memberId;
  const { id } = useParams();

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        if (id != 0) {
          const response = await requestProjectMemberList(id);
          setTeamMembers(response.data.memberInfoList);
          
          const issueResponse = await requestIssueList(id);
          setIssueList(issueResponse.data.issueInfoList);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    }
    fetchTeamMembers();
  }, [id]);

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

  const handleAddAssignee = async () => {
    if (selectedMember && !assignees.includes(selectedMember)) {
      const addObject = JSON.parse(selectedMember);
      setAssignees([...assignees, addObject]);
    }
  };

  const handleRemoveAssignee = async index => {
    const ToDeleteAssignee = assignees.filter((_, i) => i !== index);
    setAssignees(ToDeleteAssignee);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setStartDate('');
    setEndDate('');
    setAgendaContent('');
    setSelectedMember('');
    setAssignees([]);
    setSelectedIssue('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    makeAgenda();
    closeModal();
  };

  const makeAgenda = async () => {
    const toExtract = JSON.parse(selectedIssue);
    const issueId = toExtract.issueId;


    const newAgenda = {
      issueId: issueId,
      content: agendaContent,
    };

    const response = await createAgenda(newAgenda);
    const agendaId = response.data.id;

    for (let i = 0; i < assignees.length; ++i) {
      const data = {
        agendaId: agendaId,
        memberId: assignees[i].id,
      };
      await AddAgendaAssignee(data);
    }
  }

  // const agendaSubmittedList = agendaList.filter(
  //   data => data.agenda.requester.id === memberId,
  // );
  // const agendaReceivedList = agendaList.reduce((list, data) => {
  //   if (data.agenda.assigneeList.some(assignee => assignee.id === memberId)) {
  //     list.push(data);
  //   }
  //   return list;
  // }, []);

  return (
    <div className={styles.agenda}>
      <div className={styles.tab__group}>
        <Tab groupId='4' id='1' name='전체 의사결정' setDefault={true}>
          <AgendaForm agendaList={agendaList} />
        </Tab>
        <Tab groupId='4' id='2' name='요청한 의사결정'>
          <AgendaForm agendaList={agendaSubmittedList} />

          

        </div>
        <div className={styles.agendaButton}>
        <IssueAddButton text={'의사결정 요청'} onClick={setModalIsOpen}/>
        </Tab>
        <Tab groupId='4' id='3' name='받은 의사결정'>
          <AgendaForm agendaList={agendaReceivedList} />
        </Tab>
        

      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        ariaHideApp={false}
      >
        <h2 className={styles.modalTitle}>의사결정 요청</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>

        <label className={styles.modalLabel}>
            Select Issue:
            <select
              value={selectedIssue}
              onChange={e => setSelectedIssue(e.target.value)}
              className={styles.modalInput}
            >
              <option value=''>Select an Issue</option>
              {issueList.map((issue, index) => (
                <option key={index} value={JSON.stringify(issue)}>
                  {issue.title}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.modalLabel}>
            Agenda:
            <input
              type='text'
              value={agendaContent}
              onChange={e => setAgendaContent(e.target.value)}
              className={styles.modalInput}
              required
            />
          </label>
          <label className={styles.modalLabel}>
            End Date:
            <input
              type='date'
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className={styles.modalInput}
              required
            />
          </label>

          <label className={styles.modalLabel}>
            Select Assignee:
            <select
              value={selectedMember}
              onChange={e => setSelectedMember(e.target.value)}
              className={styles.modalInput}
            >
              <option value=''>Select a member</option>
              {teamMembers.map((member, index) => (
                <option key={index} value={JSON.stringify(member)}>
                  {member.name}
                </option>
              ))}
            </select>
            <button
              type='button'
              onClick={handleAddAssignee}
              className={styles.addButton}
            >
              Add
            </button>
          </label>

          <ul className={styles.assigneeList}>
            {assignees.map((assignee, index) => (
              <li key={index} className={styles.assigneeItem}>
                {assignee.name}
                <button
                  type='button'
                  onClick={() => handleRemoveAssignee(index)}
                  className={styles.removeButton}
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.modalButtons}>
            <button type='submit' className={styles.submitButton}>
              Add
            </button>
            <button
              type='button'
              onClick={closeModal}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

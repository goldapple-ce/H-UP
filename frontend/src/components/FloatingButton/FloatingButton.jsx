import ProjectModal from '@component/Modal/ProjectModal';
import TeamModal from '@component/Modal/TeamModal';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { requestCreateIssue, requestUpdateIssue } from '@api/services/issue';

import styles from './FloatingButton.module.scss';

import { requestSaveProject } from '@api/services/project';
import { requestCreateTeam } from '@api/services/team';
import { teamIdState } from '@recoil/commonPersist';

const FloatingButton = () => {
  const teamId = useRecoilValue(teamIdState);

  //팀
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const openTeamModal = () => {
    setIsTeamModalOpen(true);
    setIsProjectModalOpen(false);
    setModalIsOpen(false);
  };
  const [teamName, setTeamName] = useState('');
  const closeTeamModal = () => {
    setIsTeamModalOpen(false);
    setTeamName('');
  };
  const teamSubmit = async e => {
    e.preventDefault();
    setIsTeamModalOpen(false);
    const teamData = {
      teamName: teamName,
    };

    try {
      const response = await requestCreateTeam(teamData);
      console.log('Server Response: ', response.data);

      alert('팀 생성 성공');
    } catch (error) {
      console.error(
        'CreateTeam error: ',
        error.response ? error.response.data : error,
      );
    }
  };

  //프로젝트
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const openProjectModal = () => {
    setIsProjectModalOpen(true);
    setIsTeamModalOpen(false);
    setModalIsOpen(false);
  };
  const [name, setName] = useState('');
  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setName('');
  };
  const projectSubmit = async e => {
    setIsProjectModalOpen(false);
    const projectData = {
      teamId: teamId,
      name: name,
    };

    console.log(teamId);
    try {
      const response = await requestSaveProject(projectData);
      console.log('Server Response: ', response.data);

      alert('프로젝트 생성 성공');

      // 생성 성공 후 새로고침?
    } catch (error) {
      console.error(
        'CreateProject error: ',
        error.response ? error.response.data : error,
      );
    }
  };

  //이슈
  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
    setIsProjectModalOpen(false);
    setIsTeamModalOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setStartDate('');
    setEndDate('');
    setTitle('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    makeIssue();
    closeModal();
  };

  const makeIssue = async () => {
    const response = await requestCreateIssue({ projectId: id });
    const issueId = response.data.issueId;

    const newIssue = {
      issueId: issueId,
      title: title,
      startDate: startDate,
      endDate: endDate,
      status: 'CREATED',
    };

    await requestUpdateIssue(newIssue);
  };

  return (
    <div>
      <nav className={styles.nav}>
        <input type='checkbox' className={styles.nav__cb} id='menu-cb' />
        <div className={styles.nav__content}>
          <ul className={styles.nav__items}>
            <li className={styles.nav__item}>
              <span className={styles.nav__item_text} onClick={openTeamModal}>
                팀 생성
              </span>
            </li>
            <li className={styles.nav__item}>
              <span
                className={styles.nav__item_text}
                onClick={openProjectModal}
              >
                프로젝트 생성
              </span>
            </li>
            <li className={styles.nav__item}>
              <span className={styles.nav__item_text} onClick={openModal}>
                이슈 추가
              </span>
            </li>
          </ul>
        </div>
        <label className={styles.nav__btn} htmlFor='menu-cb'></label>
      </nav>

      <TeamModal
        isOpen={isTeamModalOpen}
        createTeam={teamSubmit}
        closeModal={closeTeamModal}
      >
        <div className={styles.team}>
          <h2>팀 생성</h2>
          <form>
            <input
              className={styles.modal_team_input}
              type='text'
              placeholder='팀 이름을 입력하세요.'
              onChange={e => setTeamName(e.target.value)}
              required
            />
          </form>
        </div>
      </TeamModal>

      <ProjectModal
        isOpen={isProjectModalOpen}
        createProject={projectSubmit}
        closeModal={closeProjectModal}
      >
        <div className={styles.project}>
          <h2>프로젝트 생성</h2>
          <form>
            <input
              className={styles.modal_project_input}
              type='text'
              placeholder='프로젝트 이름을 입력하세요.'
              onChange={e => setName(e.target.value)}
              required
            />
          </form>
        </div>
      </ProjectModal>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        ariaHideApp={false}
      >
        <h2 className={styles.modalTitle}>이슈 추가</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <label className={styles.modalLabel}>
            <input
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={styles.modalInput}
              placeholder='이슈 제목을 입력하세요.'
              required
            />
          </label>
          <label className={styles.modalLabel}>
            <p className={styles.modalLabel_start}>시작</p>
            <input
              type='date'
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className={styles.modalInput}
              required
            />
          </label>
          <label className={styles.modalLabel}>
            <p className={styles.modalLabel_end}>마감</p>
            <input
              type='date'
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className={styles.modalInput}
              required
            />
          </label>
          <div className={styles.modalButtons}>
            <button type='submit' className={styles.submitButton}>
              생성
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FloatingButton;

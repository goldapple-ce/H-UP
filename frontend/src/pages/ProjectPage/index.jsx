import MainTab from '@component/MainTab/MainTab';
import styles from './ProjectPage.module.scss'; // SCSS 스타일 시트 임포트
import { useParams } from 'react-router-dom';
import { createIssue, updateIssue } from '@api/services/issue';
import IssueAddButton from '@component/IssueAddButton/IssueAddButton';
import Modal from 'react-modal';
import { useState } from 'react';

export default function ProjectPage() {

  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
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
    const response = await createIssue({projectId:id});
    const issueId = response.data.issueId;

    const newIssue = {
      issueId: issueId,
      title: title,
      startDate: startDate,
      endDate: endDate,
      status: 'CREATED'
    };

    await updateIssue(newIssue);
  }

  return (
    <div className={styles.issue_container}>
      <h2>프로젝트 페이지</h2>
      <div>
        <IssueAddButton text={'이슈추가'} onClick={setModalIsOpen}/>
      </div>
      <div>
        <MainTab />
      </div>

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
            Title:
            <input
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={styles.modalInput}
              required
            />
          </label>
          <label className={styles.modalLabel}>
            Start Date:
            <input
              type='date'
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
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

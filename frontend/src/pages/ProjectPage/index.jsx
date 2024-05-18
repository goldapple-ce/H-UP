import MainTab from '@component/MainTab/MainTab';
import FloatingButton from '@component/FloatingButton/FloatingButton';
import styles from './ProjectPage.module.scss'; // SCSS 스타일 시트 임포트

export default function ProjectPage() {

  return (
    <div className={styles.issue_container}>
      <h2>프로젝트 페이지</h2>
      <div>
        <MainTab />
      </div>
      <FloatingButton/>
      {/* <Modal
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
      </Modal> */}
      <div>
      <FloatingButton />
      </div>
    </div>
  );
}

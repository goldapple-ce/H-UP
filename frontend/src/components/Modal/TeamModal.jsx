import styles from './TeamModal.module.scss';

function TeamModal({ isOpen, children, createTeam, closeModal }) {
  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={styles.modal_background} onClick={closeModal}></div>
      <div className={styles.modal_screen}>
        <div>{children}</div>
        <button className={styles.modal_closeBnt} onClick={createTeam}>
          생성
        </button>
      </div>
    </div>
  );
}

export default TeamModal;

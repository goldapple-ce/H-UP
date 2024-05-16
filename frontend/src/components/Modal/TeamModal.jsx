import styles from './TeamModal.module.scss';

function TeamModal({isOpen, children, closeModal}) {
    return (
        <div style={{ display: isOpen ? "block" : "none"}}>
            <div className={styles.modal_background}></div>
            <div className={styles.modal_screen}>
            <div>{children}</div>
            <button className={styles.modal_closeBnt} onClick={closeModal}>생성</button>
            </div>
        </div>
    )
}

export default TeamModal;
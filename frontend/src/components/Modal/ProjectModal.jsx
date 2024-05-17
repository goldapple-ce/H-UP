import styles from './ProjectModal.module.scss';

function ProjectModal({isOpen, children, createProject, closeModal}) {
    return (
        <div style={{ display: isOpen ? "block" : "none"}}>
            <div className={styles.modal_background} onClick={ closeModal }></div>
            <div className={styles.modal_screen}>
            <div>{children}</div>
            <button className={styles.modal_closeBnt} onClick={createProject}>생성</button>
            </div>
        </div>
    )
}

export default ProjectModal;
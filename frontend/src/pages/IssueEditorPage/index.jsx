import styles from './IssueEditorPage.module.scss';
import BlockNote from '@component/BlockNote/BlockNote';


function IssueEditorPage() {

  return (
    <div className={styles.editor_page}>
      <div className={styles.editor_container}>
        <BlockNote/>
      </div>
    </div>
  );
}

export default IssueEditorPage;

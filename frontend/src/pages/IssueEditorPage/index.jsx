import styles from './IssueEditorPage.module.scss';
import BlockNote from '@component/BlockNote/BlockNote';
import { useParams } from 'react-router-dom';

function IssueEditorPage() {

  const { id } = useParams();

  return ( id &&
    <div className={styles.editor_page}>
      <div className={styles.editor_container}>
        <BlockNote issueId={id}/>
      </div>
    </div>
  );
}

export default IssueEditorPage;

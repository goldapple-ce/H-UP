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
      <FloatingButton />
    </div>
  );
}

import { createIssue } from '@api/services/issue';
import MainTab from '@component/MainTab/MainTab';
import { useIssueListQuery } from '@hook/ReactQuery/useIssueList';
import { useParams } from 'react-router-dom';
import styles from './ProjectPage.module.scss'; // SCSS 스타일 시트 임포트
import { useEffect, useState } from 'react';

// async function makingIssueId(projectId) {
//   const data = {
//     projectId: projectId
//   };

//   const response = await createIssue(data);
// }

export default function ProjectPage() {
  const { id } = useParams();

  return (
    <div className={styles.issue_container}>
      <h2>프로젝트 페이지</h2>
      {/* <div>
        <IssueAddButton text={'이슈추가'} onClick={() => makingIssueId(id)}/>
      </div> */}
      <div>
        <MainTab />
      </div>
    </div>
  );
}

import { authState } from '@recoil/auth';
import { useRecoilState } from 'recoil';
import styles from './IssueForm.module.scss';
import IssueItemContainer from './IssueItemContainer';
import { useEffect, useState } from 'react';

const IssueForm = issues => {
  const [issueList, setIssueList] = useState([]);
  const [userInfo] = useRecoilState(authState);
  // const { startLoading, finishLoading } = MyLayout.useLoading();
  // const { openDialog } = MyLayout.useDialog();

  useEffect(() => {
    setIssueList(issues.issues);
  }, [issues]);

  console.log(issueList);
  const imminentDate = issue => {
    const date = issue.endDate;
    if (!date) {
      return new Date(2024, 4, 23, 0, 0, 0);
    }
    return new Date(date);
  };

  return (
    <div className={styles.issue_page}>
      {/* 이슈 목록 */}
      <div className={styles.column1}>
        <div className={styles.issue_section}>
          <ul>
            {issueList &&
              issueList.map(issue => (
                <li key={issue.issueId}>
                  <IssueItemContainer issue={issue} />
                </li>
              ))}
          </ul>
        </div>
      </div>
      {/* 마감 임박 이슈 목록 */}
      <div className={styles.column2}>
        <div className={styles.imminent_issue_section}>
          <h4>마감이 임박한 이슈</h4>
          <ul>
            {issueList &&
              issueList
                .filter(
                  issue =>
                    new Date() >= imminentDate(issue) &&
                    issue.status !== 'COMPLETED',
                )
                .map(issue => (
                  <li key={issue.issueId}>
                    <IssueItemContainer issue={issue} />
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IssueForm;

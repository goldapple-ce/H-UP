import { issueState } from '@recoil/issue';
import { useRecoilState } from 'recoil';
import styles from './IssueForm.module.scss';
import IssueItemContainer from './IssueItemContainer';

const IssueForm = () => {
  const [issueList, setIssueList] = useRecoilState(issueState);
  // const { startLoading, finishLoading } = MyLayout.useLoading();
  // const { openDialog } = MyLayout.useDialog();
  console.log(issueList);
  const imminentDate = issue => {
    const date = issue.endDate;
    if (!date) {
      return new Date('2030-05-31');
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

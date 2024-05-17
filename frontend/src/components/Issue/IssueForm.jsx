import { issueState } from '@recoil/issue';
import { useRecoilState } from 'recoil';
import styles from './IssueForm.module.scss';
import IssueItemContainer from './IssueItemContainer';
import { useParams } from 'react-router-dom';

const IssueForm = () => {
  const [issueList, setIssueList] = useRecoilState(issueState);
  // const { startLoading, finishLoading } = MyLayout.useLoading();
  // const { openDialog } = MyLayout.useDialog();

  // const { id } = useParams(); // Get the project ID from useParams hook

  // const getIssueList = async (id) => {
  //   try {
  //     const response = await LoadIssueList(id);
  //     setIssueList(response.data.responseList);
  //   } catch (error) {
  //     console.error('Error fetching initial content:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (id > 0) {
  //     getIssueList(id);
  //   }
  // }, [id]);

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
              issueList?.map(issue => (
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

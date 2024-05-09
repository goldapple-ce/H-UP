import { LoadIssueList } from '@api/service/issue';
import { authState } from '@recoil/auth';
import { issueListState } from '@recoil/recoil';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styles from './IssueForm.module.scss';
import IssueItemContainer from './IssueItemContainer';

const IssueForm = () => {
  const [issueList, setIssueList] = useRecoilState(issueListState);
  const { userInfo } = useRecoilState(authState);
  // const { startLoading, finishLoading } = MyLayout.useLoading();
  // const { openDialog } = MyLayout.useDialog();

  const token = userInfo.jwtToken.accessToken;
  //////////////////////////////////////////////////////////////////////////////////
  // 이슈 받아오는 테스트 코드 추가
  const TestFunction = async () => {
    try {
      const response = await LoadIssueList(1);
      console.log(response.data.responseList);
    } catch (error) {
      console.error('Error fetching initial content:', error);
    }
  };

  const hasExecuted = useRef(false);

  useEffect(() => {
    if (!hasExecuted.current) {
      TestFunction();
      hasExecuted.current = true;
    }
  }, []);
  //////////////////////////////////////////////////////////////////////////////////

  const imminentDate = issue => {
    const date = issue.endDate;

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate() - 7;

    return new Date(year, month, day, 0, 0, 0, 0);
  };

  return (
    <div className={styles.issue_page}>
      {/* 이슈 목록 */}
      <div className={styles.column1}>
        <div className={styles.issue_section}>
          <ul>
            {issueList.map(issue => (
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
            {issueList
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

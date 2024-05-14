import { LoadIssueList } from '@api/services/issue';
import { authState } from '@recoil/auth';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './IssueForm.module.scss';
import IssueItemContainer from './IssueItemContainer';
import { useParams } from 'react-router-dom';

const IssueForm = () => {
  const [issueList, setIssueList] = useState([]);
  const [userInfo] = useRecoilState(authState);
  // const { startLoading, finishLoading } = MyLayout.useLoading();
  // const { openDialog } = MyLayout.useDialog();

  const { id } = useParams(); // Get the project ID from useParams hook

  const getIssueList = async (id) => {
    try {
      const response = await LoadIssueList(id);
      setIssueList(response.data.responseList);
    } catch (error) {
      console.error('Error fetching initial content:', error);
    }
  };

  useEffect(() => {
    if (id > 0) {
      getIssueList(id);
    }
  }, [id]);


  const imminentDate = issue => {
    const date = issue.endDate;
    if (!date) {
      return new Date(2024, 4, 23, 0, 0, 0);
    }

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

import { issueState } from '@recoil/issue';
import { useRecoilState } from 'recoil';
import styles from './IssueForm.module.scss';
import IssueItem from './IssueItem';

const IssueForm = () => {
  const [issueList] = useRecoilState(issueState);
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

  const isImminent = issue => {
    if (issue.endDate) {
      const today = new Date();
      const endDate = new Date(issue.endDate);
      const timeDiff = endDate - today;
      const daysLeft = timeDiff / (1000 * 60 * 60 * 24);

      return daysLeft <= 10 && issue.status != 'COMPLETED';
    }

    return false;
  };

  return (
    <div className={styles.issue__container}>
      <div className={styles.issue__column1}>
        <ul className={styles.issue__list}>
          {issueList &&
            issueList.length > 0 &&
            issueList.map(issue => (
              <li key={issue.issueId}>
                <IssueItem issue={issue} />
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.issue__column2}>
        <h4>마감이 임박한 이슈</h4>
        <ul className={styles.issue__new_list}>
          {issueList &&
            issueList.length > 0 &&
            issueList
              .filter(issue => isImminent(issue))
              .map(issue => (
                <li key={issue.issueId}>
                  <IssueItem issue={issue} />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default IssueForm;

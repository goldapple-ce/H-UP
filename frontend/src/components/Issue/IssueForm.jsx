import React from 'react'
import styles from './IssueForm.module.scss'
import IssueItemContainer from "./IssueItemContainer";
import { issueDummyList } from '../../test/issueData';
import { useRecoilState } from 'recoil';
import { issueListState } from '../../recoil/recoil';

const IssueForm = () => {

    const [issueList, setIssueList] = useRecoilState(issueListState)
    // const { startLoading, finishLoading } = MyLayout.useLoading();
    // const { openDialog } = MyLayout.useDialog();

    const imminentDate = (issue) => {
        const date = issue.end

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate() - 7;

        return new Date(year,month,day,0,0,0,0)
    }

    return (
        <div className={styles.issue_page}>
        {/* 이슈 목록 */}
            <div className={styles.column1}>
                <div className={styles.issue_section}>
                <h4>이슈 목록</h4>
                    <ul>
                        {issueList.map((issue) => (
                            <li key={issue.id}>
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
                            .filter((issue) => new Date() >= imminentDate(issue) && issue.progress !== '완료')
                            .map((issue) => (
                                <li key={issue.id}>
                                    <IssueItemContainer issue={issue} />
                                </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )

}

export default IssueForm
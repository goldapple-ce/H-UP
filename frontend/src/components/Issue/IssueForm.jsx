import React from 'react'
import styles from './IssueForm.module.scss'
import OrderableIssueItem from "../../components/Issue/OrderableIssueItem";

const IssueForm = () => {

    // const [issueList, setIssueList] = React.useState([]);
    // const { startLoading, finishLoading } = MyLayout.useLoading();
    // const { openDialog } = MyLayout.useDialog();


    const issueList = [{
        id: 1,
        name: "이슈 1",
    }, {
        id: 2,
        name: "이슈 2",
    }]

    const imminentIssueList = [{
        id: 1,
        name: "마감 이슈 1",
    }, {
        id: 2,
        name: "마감 이슈 2",
    }]


    return (
        <div className={styles.issue_page}>
        {/* 이슈 목록 */}
            <div className={styles.issue_section}>
            <h4>이슈</h4>
                <ul>
                    {issueList.map((issue) => (
                        <li key={issue.id}>
                            <OrderableIssueItem issue={issue} />
                        </li>
                    ))}
                </ul>
            </div>
            {/* 마감 임박 이슈 목록 */}
            
            <div className={styles.imminent_issue_section}>
                <h4>마감이 임박한 이슈</h4>
                <ul>
                    {imminentIssueList.map((issue) => (
                        <li key={issue.id}>
                            <OrderableIssueItem issue={issue} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}

export default IssueForm
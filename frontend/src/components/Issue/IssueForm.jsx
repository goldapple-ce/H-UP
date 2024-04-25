import React from 'react'
import styles from './IssueForm.module.scss'
import IssueItemContainer from "./IssueItemContainer";

const IssueForm = () => {

    // const [issueList, setIssueList] = React.useState([]);
    // const { startLoading, finishLoading } = MyLayout.useLoading();
    // const { openDialog } = MyLayout.useDialog();


    const issueList = [{
        id: 1,
        name: "이슈 1",
        imageList: [{
            id: 1,
            src: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
            alt: 1,
        }, {
            id: 2,
            src: "https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80",
            alt: 2,
        }, {
            id: 3,
            src: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
            alt: 3,
        }, {
            id: 4,
            src: "https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
            alt: 4,
        }]
    
    }, {
        id: 2,
        name: "이슈 2",
        imageList : [{
            id: 1,
            src: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
            alt: 1,
        }, {
            id: 2,
            src: "https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80",
            alt: 2,
        }, {
            id: 3,
            src: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
            alt: 3,
        }]
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
            <h4>이슈 목록</h4>
                <ul>
                    {issueList.map((issue) => (
                        <li key={issue.id}>
                            <IssueItemContainer issue={issue} />
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
                            <IssueItemContainer issue={issue} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}

export default IssueForm
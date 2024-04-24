import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainTab from '../../components/tab/MainTab';
import OrderableIssueItem from "./OrderableIssueItem";
import styles from './ProjectPage.module.scss'; // SCSS 스타일 시트 임포트


const ProjectPage = (props) => {

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
    <div className={styles.issue_container}>
        <h2>프로젝트 페이지</h2>
        <div>
            <MainTab/>
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
        </div>
    </div>
  )
}


export default ProjectPage
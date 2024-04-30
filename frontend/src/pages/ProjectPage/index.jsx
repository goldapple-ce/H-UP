import React from 'react'
import MainTab from '../../components/MainTab/MainTab';
import styles from './ProjectPage.module.scss'; // SCSS 스타일 시트 임포트


const ProjectPage = (props) => {

    

  return (
    <div className={styles.issue_container}>
        <h2>프로젝트 페이지</h2>
        <div>
            <MainTab/>
        </div>
    </div>
  )
}


export default ProjectPage
// components/Button/RoundButton.js
import React from 'react';
import styles from './IssueAddButton.module.scss'; // SCSS 스타일 시트 임포트

const IssueAddButton = ({ text, onClick }) => {
    return (
        <button className={styles.roundButton} onClick={onClick}>
            {text}
        </button>
    );
}

export default IssueAddButton;

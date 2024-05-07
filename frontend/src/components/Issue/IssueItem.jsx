import React from "react";
import styles from "./IssueItem.module.scss";

const IssueItem = ({ issue, onClick }) => {
    const {id, title, content, progress, start, end, imageList }= issue;

    const formatToDate = (jsDateStr) => {
        const date = new Date(jsDateStr);
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        // const hour = date.getHours();
        // const minutes = date.getMinutes();
        // const formattedDate = `${year}년 ${month}월 ${day}일 ${hour}:${minutes}`;
        const formattedDate = `${year}년 ${month}월 ${day}일`;
        return formattedDate;
      };

    return (
        <div className={styles.issue_item_container} onClick={onClick}>
            <div className="status">{progress}</div>
            <div className="task-name">{title}</div>
            {/* <div className="more-button"></div> */}
            <ul>
                <p className="time">{formatToDate(start)} ~ {formatToDate(end)}</p>
                {imageList && imageList.map((image) => (
                <img key={image.id}
                    src={image.src}
                    alt={image.alt}>
                </img>
                ))}
            </ul>
        </div>
    );
};

export default IssueItem;
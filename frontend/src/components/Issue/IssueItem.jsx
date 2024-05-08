import React, { useState, useEffect } from "react";
import styles from "./IssueItem.module.scss";
import checkIcon from "../../assets/img/check_icon.png";
import playIcon from "../../assets/img/play_icon.png";
import upArrowIcon from "../../assets/img/up_arrow_icon.png";
import pauseIcon from "../../assets/img/pause_icon.png";
import { TITLE_NAME } from "../Kanban/Kanban";


const IssueItem = ({ issue, onClick }) => {
    const {id, title, content, progress, start, end, imageList }= issue;
    const {TO_DO, IN_PROGRESS, NOTE, DONE} = TITLE_NAME;
    const [ iconImage, setIconImage ] = useState('');

    const formatToDate = (jsDateStr) => {
        const date = new Date(jsDateStr);
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        // const hour = date.getHours();
        // const minutes = date.getMinutes();
        // const formattedDate = `${year}년 ${month}월 ${day}일 ${hour}:${minutes}`;
        const formattedDate = `${year}. ${month}. ${day}`;
        return formattedDate;
      };

      useEffect(() => {
        switch (progress) {
          case TO_DO:
            setIconImage(upArrowIcon);
            break;
          case IN_PROGRESS:
            setIconImage(playIcon);
            break;
          case DONE:
            setIconImage(checkIcon);
            break;
          case NOTE:
            setIconImage(pauseIcon);
            break;
        }
      }, [progress]);

    return (
        <div className={styles.issue_item_container} onClick={onClick}>
            <img className={styles.iconImage} src={iconImage} alt={progress}/>
            <h5 className="task-name">{title}</h5>
            <ul>
                <p className={styles.date}>{formatToDate(start)} ~ {formatToDate(end)}</p>
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
import checkIcon from '@asset/img/check_icon.png';
import pauseIcon from '@asset/img/pause_icon.png';
import playIcon from '@asset/img/play_icon.png';
import upArrowIcon from '@asset/img/up_arrow_icon.png';
import { useEffect, useState } from 'react';
import { TITLE_NAME } from '../Kanban/Kanban';
import styles from './IssueItem.module.scss';

const IssueItem = ({ issue, onClick }) => {
  const { issueId, title, status, startDate, endDate, memberInfo } = issue;
  const { CREATED, SELECTED, PROGRESS, COMPLETED } = TITLE_NAME;
  const [iconImage, setIconImage] = useState('');

  const formatToDate = jsDateStr => {
    const date = new Date(jsDateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // const hour = date.getHours();
    // const minutes = date.getMinutes();
    // const formattedDate = `${year}년 ${month}월 ${day}일 ${hour}:${minutes}`;
    const formattedDate = `${year}. ${month}. ${day}`;
    return formattedDate;
  };

  useEffect(() => {
    switch (status) {
      case CREATED:
        setIconImage(upArrowIcon);
        break;
      case PROGRESS:
        setIconImage(playIcon);
        break;
      case COMPLETED:
        setIconImage(checkIcon);
        break;
      case SELECTED:
        setIconImage(pauseIcon);
        break;
    }
  }, [status]);

  return (
    <div className={styles.issue_item_container} onClick={onClick}>
      <img className={styles.iconImage} src={iconImage} alt={status} />
      <h5 className='task-name'>{title}</h5>
      <ul>
        <p className={styles.date}>
          {formatToDate(startDate)} ~ {formatToDate(endDate)}
        </p>
        {memberInfo && (
          <img
            key={memberInfo.id}
            src={memberInfo.img}
            alt={memberInfo.name}
          ></img>
        )}
      </ul>
    </div>
  );
};

export default IssueItem;

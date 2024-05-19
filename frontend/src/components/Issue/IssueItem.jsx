import checkIcon from '@asset/img/check_icon.png';
import pauseIcon from '@asset/img/pause_icon.png';
import playIcon from '@asset/img/play_icon.png';
import upArrowIcon from '@asset/img/up_arrow_icon.png';
import STATUS from '@constant/status';
import { useEffect, useState } from 'react';
import './IssueItem.scss';
import UserIcon from '@component/common/UserIcon';
import DropdownMenu from '@component/common/DropdownMenu';
import { requestUpdateIssue } from '@api/services/issue';
import { useNavigate } from 'react-router-dom';

const IssueItem = ({ issue }) => {
  const navigate = useNavigate();
  const {
    issueId,
    title,
    status,
    startDate,
    endDate,
    memberInfo,
    assigneeInfoList,
  } = issue;
  const { CREATED, SELECTED, PROGRESS, COMPLETED } = STATUS;
  const [iconImage, setIconImage] = useState('');
  const [issueStatus, setIssueStatus] = useState(status);
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleClick = () => {
    navigate(`/issue/${issueId}`);
  };

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
  }, [issueStatus]);

  const updateIssueStatus = async newStatus => {
    setIssueStatus(newStatus);
    await requestUpdateIssue({
      issueId: issueId,
      title: title,
      status: newStatus,
      startDate: startDate,
      endDate: endDate,
    });
  };

  return (
    <div className='issue_item__container'>
      <div className='issue__icon'>
        <DropdownMenu status={issueStatus} setStatus={updateIssueStatus} />
      </div>
      <div className='issue_item'>
        <div className='issue_item__content' onClick={handleClick}>
          <h5>{title}</h5>
        </div>
        <div className='issue_item__date'>
          <p>
            {formatToDate(startDate)} ~ {formatToDate(endDate)}
          </p>
        </div>
        <div className='issue_item__info_container'>
          {assigneeInfoList &&
            assigneeInfoList
              .slice(0, showAll ? assigneeInfoList.length : 2)
              .map(mem => (
                <UserIcon key={mem.id} src={mem.img} alt={mem.name} />
              ))}
          {assigneeInfoList.length > 2 && !showAll && (
            <p onClick={handleShowMore}>+{assigneeInfoList.length - 2} more</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueItem;

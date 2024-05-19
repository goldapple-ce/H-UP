import { deleteAgenda } from '@api/services/agenda';
import playIcon from '@asset/img/play_icon.png';
import IconButton from '@component/IconButton/IconButton';
import UserIcon from '@component/common/UserIcon';
import { CaretRightFill } from 'react-bootstrap-icons';
import { DeleteOutline } from 'styled-icons/material';
import './AgendaItem.scss';

const AgendaItem = ({ agenda, onClick }) => {
  const { id, content, createdAt, requester, assigneeList } = agenda;

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

  const handledelete = async () => {
    await deleteAgenda(id);
  };

  return (
    <div className='agenda_item__container' onClick={onClick}>
      <div className='agenda_item__icon'>
        <img src={playIcon} alt='' />
      </div>
      <div className='agenda_item'>
        <div className='agenda_item__content'>
          <h5>{content}</h5>
        </div>
        <div className='agenda_item__date'>
          <p>{formatToDate(createdAt)}</p>
        </div>
        <div className='agenda_item__info_container'>
          <UserIcon src={requester.img} alt={requester.name} />
          <CaretRightFill className='agenda_item__caret' />
          {assigneeList.length > 0 &&
            assigneeList.map(assignee => (
              <UserIcon
                key={assignee.id}
                src={assignee.img}
                alt={assignee.name}
              />
            ))}
        </div>
        <div className='agenda_item__delete_button'>
          <IconButton agenda={handledelete}>
            <DeleteOutline />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default AgendaItem;

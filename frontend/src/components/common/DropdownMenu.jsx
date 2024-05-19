import checkIcon from '@asset/img/check_icon.png';
import pauseIcon from '@asset/img/pause_icon.png';
import playIcon from '@asset/img/play_icon.png';
import upArrowIcon from '@asset/img/up_arrow_icon.png';
import STATUS from '@constant/status';
import { useEffect, useState } from 'react';
import './DropdownMenu.scss';

function DropdownMenu({ status, setStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const { CREATED, SELECTED, PROGRESS, COMPLETED } = STATUS;
  const [iconImage, setIconImage] = useState('');

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

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleStatusChange = newStatus => {
    setStatus(newStatus); // 외부에서 받은 setStatus 함수 호출
    setIsOpen(false); // 드롭다운 닫기
  };

  return (
    <div className='dropdown-container'>
      <button onClick={handleDropdownToggle} className='dropdown-button'>
        <img className='iconImage' src={iconImage} alt={status} />
      </button>
      <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
        <button onClick={() => handleStatusChange(SELECTED)}>
          <img className='iconImage' src={pauseIcon} alt={status} />
          <p>Selected</p>
        </button>
        <button onClick={() => handleStatusChange(PROGRESS)}>
          <img className='iconImage' src={playIcon} alt={status} />
          <p>In Progress</p>
        </button>
        <button onClick={() => handleStatusChange(COMPLETED)}>
          <img className='iconImage' src={checkIcon} alt={status} />
          <p>Completed</p>
        </button>
      </div>
    </div>
  );
}

export default DropdownMenu;

import checkIcon from '@asset/img/check_icon.png';
import pauseIcon from '@asset/img/pause_icon.png';
import playIcon from '@asset/img/play_icon.png';
import upArrowIcon from '@asset/img/up_arrow_icon.png';
import STATUS from '@constant/status';
import { useEffect, useState } from 'react';
import styles from './DropdownMenu.module.scss';

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
    <div className={styles.dropdown_container}>
      <button onClick={handleDropdownToggle} className={styles.dropdown_button}>
        <img className={styles.iconImage} src={iconImage} alt={status} />
      </button>
      <div className={`${styles.dropdown_content} isOpen ? 'show' : ''`}>
        <button onClick={() => handleStatusChange(SELECTED)}>
          <img className={styles.iconImage} src={pauseIcon} alt={status} />
          <p>Selected</p>
        </button>
        <button onClick={() => handleStatusChange(PROGRESS)}>
          <img className={styles.iconImage} src={playIcon} alt={status} />
          <p>In Progress</p>
        </button>
        <button onClick={() => handleStatusChange(COMPLETED)}>
          <img className={styles.iconImage} src={checkIcon} alt={status} />
          <p>Completed</p>
        </button>
      </div>
    </div>
  );
}

export default DropdownMenu;

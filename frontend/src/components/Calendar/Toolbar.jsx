import { useRecoilState } from 'recoil';
import styles from './Toolbar.module.scss';
import { MyCalendarState } from '@recoil/calendar';

export default function Toolbar(props) {
  const [isChecked, setIsChecked] = useRecoilState(MyCalendarState);
  const { date } = props;

  const navigate = action => {
    props.onNavigate(action);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className='rbc-toolbar'>
      <span className='rbc-btn-group'>
        <button type='button' onClick={navigate.bind(null, 'TODAY')}>
          이번달
        </button>
        <button type='button' onClick={navigate.bind(null, 'PREV')}>
          이전
        </button>
        <span className='rbc-toolbar-label'>{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</span>
        <button type='button' onClick={navigate.bind(null, 'NEXT')}>
          다음
        </button>
      </span>
      <div className={styles.checkbox}>
        <input 
          type='checkbox'
          id='isMine'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor='isMine'>나의 이슈</label>
      </div>
    </div>
  );
}

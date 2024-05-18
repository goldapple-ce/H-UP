import Todo from '@component/Todo/Todo';
import styles from './MainTab.module.scss';

export default function Tab({ groupId, id, name, setDefault, onClick }) {
  return (
    <div className={styles.tab} onClick={onClick}>
      <input
        className={styles.tab__radio}
        type='radio'
        id={`tab-${groupId}-${id}`}
        name={`tab-group-${groupId}`}
        defaultChecked={setDefault}
      />
      <label className={styles.tab__label} htmlFor={`tab-${groupId}-${id}`}>
        {name}
      </label>
    </div>
  );
}

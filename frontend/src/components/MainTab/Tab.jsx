import styles from './MainTab.module.scss';

export default function Tab({ groupId, id, name, children, setDefault }) {
  return (
    <div className={styles.tab}>
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
      <div className={styles.tab__content}>{children}</div>
    </div>
  );
}

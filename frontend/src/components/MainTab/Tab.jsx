import styles from './MainTab.module.scss';

export default function Tab({ id, name, children, setDefault }) {
  return (
    <div className={styles.tab}>
      <input
        className={styles.tab__radio}
        type='radio'
        id={`tab-${id}`}
        name={`tab-group-1`}
        defaultChecked={setDefault}
      />
      <label className={styles.tab__label} htmlFor={`tab-${id}`}>
        {name}
      </label>
      <div className={styles.tab__content}>{children}</div>
    </div>
  );
}

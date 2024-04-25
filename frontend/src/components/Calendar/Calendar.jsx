import React from 'react';
import styles from './Calendar.module.scss';

function Calendar() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth).getDay();

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div className={styles.empty} key={`empty-${i}`}></div>);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(<div key={`day-${i}`}>{i}</div>);
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>{`${today.toLocaleString('default', { month: 'long' })} ${currentYear}`}</div>
      <div className={styles.weekdays}>
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className={styles.days}>{days}</div>
    </div>
  );
}

export default Calendar;

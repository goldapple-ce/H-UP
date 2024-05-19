import STATUS from '@constant/status';
import STATUS_COLOR from '@constant/statusColor';
import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import styles from './KanbanList.module.scss';

function KanbanList({ title, children }) {
  const [spanColor, setSpanColor] = useState('');
  const { CREATED, SELECTED, PROGRESS, COMPLETED } = STATUS;
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'card',
    drop: () => ({ name: title }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    setSpanColor(STATUS_COLOR[title]);
  }, [title]);

  return (
    <div>
      <h5>{title}</h5>
      <div className={styles.container}>
        <div className={styles.column} ref={drop}>
          <div
            style={{ backgroundColor: spanColor }}
            className={styles.kanbanListWrap}
          >
            <span className={styles.span}></span>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(KanbanList);

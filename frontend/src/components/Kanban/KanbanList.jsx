import STATUS from '@constant/status';
import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import styles from './KanbanList.module.scss';
import { cardColor } from '@constant/cardColor';

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
    setSpanColor(cardColor[title]);
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
            <span></span>
            {children}
            {/* <KanbanCreator title={title} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(KanbanList);

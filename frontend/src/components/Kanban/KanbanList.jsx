import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { TITLE_NAME } from './Kanban';
import styles from './KanbanList.module.scss';

function KanbanList({ title, children }) {
  const [spanColor, setSpanColor] = useState('');
  const { CREATED, SELECTED, PROGRESS, COMPLETED } = TITLE_NAME;
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'card',
    drop: () => ({ name: title }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    switch (title) {
      case CREATED:
        setSpanColor('#ef5777');
        break;
      case SELECTED:
        setSpanColor('#B33771');
        break;
      case PROGRESS:
        setSpanColor('#341f97');
        break;
      case COMPLETED:
        setSpanColor('#130f40');
        break;
    }
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

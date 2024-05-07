import React, { useState, useEffect } from 'react';
import KanbanCreator from './KanbanCreator';
import { useDrop } from 'react-dnd';
import styles from './KanbanList.module.scss';
import { TITLE_NAME } from './Kanban';

function KanbanList({ title, children }) {
  const [spanColor, setSpanColor] = useState('');
  const {TO_DO, IN_PROGRESS, DONE, NOTE} = TITLE_NAME;
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'card',
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    switch (title) {
      case TO_DO:
        setSpanColor('#ef5777');
        break;
      case IN_PROGRESS:
        setSpanColor('#B33771');
        break;
      case DONE:
        setSpanColor('#341f97');
        break;
      case NOTE:
        setSpanColor('#130f40');
        break;
    }
  }, [title]);

  return (
    <div>
      <h5>{title}</h5>
      <div className={styles.container}>
        <div className={styles.column} ref={drop}>
          <div style={{ backgroundColor: spanColor }} className={styles.kanbanListWrap} >
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



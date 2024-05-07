import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useRecoilState } from 'recoil';
import { TITLE_NAME } from './Kanban';
import { issueListState } from '../../recoil/recoil';
import { useNavigate } from 'react-router-dom';
import styles from "./Card.module.scss"

function Card({ item }) {
  const [list, setList] = useRecoilState(issueListState);
  const [cardColor, setCardColor] = useState('');
  const index = list.findIndex((data) => data === item);
  const ref = useRef(null);
  const { TO_DO, IN_PROGRESS, DONE, NOTE } = TITLE_NAME;
  const navigate = useNavigate();

  const replaceIndex = (list, index, data) => {
    return [...list.slice(0, index), data, ...list.slice(index + 1)];
  };

  const editTitle = (e) => {
    const newList = replaceIndex(list, index, {
      ...item,
      title: e.target.value,
    });
    setList(newList);
  };
  const editText = (e) => {
    const newList = replaceIndex(list, index, {
      ...item,
      content: e.target.value,
    });
    setList(newList);
  };

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '70px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);

  const deleteItem = () => {
    setList([...list.slice(0, index), ...list.slice(index + 1)]);
  };

  const changeItemProgress = (selectedItem, newProgress) => {
    setList((prevList) =>
    prevList.map((item) =>
      item.id === selectedItem.id ? { ...item, progress: newProgress } : item
    )
  );
};

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'card',
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        switch (dropResult.name) {
          case TO_DO:
            changeItemProgress(item, TO_DO);
            break;
          case IN_PROGRESS:
            changeItemProgress(item, IN_PROGRESS);
            break;
          case DONE:
            changeItemProgress(item, DONE);
            break;
          case NOTE:
            changeItemProgress(item, NOTE);
            break;
        }
      }
    },
  }));

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/issue/${item.id}`);
  };

  useEffect(() => {
    switch (item.progress) {
      case TO_DO:
        setCardColor('#ef5777');
        break;
      case IN_PROGRESS:
        setCardColor('#B33771');
        break;
      case DONE:
        setCardColor('#341f97');
        break;
      case NOTE:
        setCardColor('#130f40');
        break;
    }
  }, [item]);

  

  return (
    <div
      className={styles.cardWrap}
      ref={dragRef}
      style={{
        opacity: isDragging ? '0.3' : '1',
        boxShadow: `1px 1px 5px 0.1px ${cardColor}`,
       }}
      onClick={handleClick}
    >
      <div className={styles.cardHeaderWrap}>
        <h5>{item.title}</h5>
      </div>
      <div className={styles.imageList}>
        {item.imageList && item.imageList.map((image) => (
        <img key={image.id}
            src={image.src}
            alt={image.alt}>
        </img>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Card);
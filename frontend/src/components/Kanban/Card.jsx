import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useRecoilState } from 'recoil';
import { TITLE_NAME } from './Kanban';
import { issueListState } from '../../recoil/recoil';
import './Card.scss';
import { useNavigate } from 'react-router-dom';

function Card({ item }) {
  const [list, setList] = useRecoilState(issueListState);
  const [badgeColor, setBadgeColor] = useState('');
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

  const changeItemCategory = (selectedItem, newCategory) => {
    setList((prevList) =>
    prevList.map((item) =>
      item.id === selectedItem.id ? { ...item, category: newCategory } : item
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
            changeItemCategory(item, TO_DO);
            break;
          case IN_PROGRESS:
            changeItemCategory(item, IN_PROGRESS);
            break;
          case DONE:
            changeItemCategory(item, DONE);
            break;
          case NOTE:
            changeItemCategory(item, NOTE);
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
    switch (item.category) {
      case TO_DO:
        setBadgeColor('#ef5777');
        break;
      case IN_PROGRESS:
        setBadgeColor('#B33771');
        break;
      case DONE:
        setBadgeColor('#341f97');
        break;
      case NOTE:
        setBadgeColor('#130f40');
        break;
    }
  }, [item]);

  

  return (
    <div
      className="cardWrap"
      ref={dragRef}
      style={{ opacity: isDragging ? '0.3' : '1' }}
      onClick={handleClick}
    >
      <div className="cardHeaderWrap">
        <h5>{item.title}</h5>
        <p>{item.content}</p>
      </div>
      <div>
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
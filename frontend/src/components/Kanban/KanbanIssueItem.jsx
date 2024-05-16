import UserIcon from '@component/common/UserIcon';
import STATUS from '@constant/status';
import { issueState } from '@recoil/issue';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styles from './Card.module.scss';

function KanbanIssueItem({ item }) {
  console.log(item);
  const [issueList, setIssueList] = useRecoilState(issueState);
  const [cardColor, setCardColor] = useState('');
  const index = issueList.findIndex(data => data === item);
  const ref = useRef(null);
  const { CREATED, SELECTED, PROGRESS, COMPLETED } = STATUS;
  const navigate = useNavigate();

  const replaceIndex = (list, index, data) => {
    return [...list.slice(0, index), data, ...list.slice(index + 1)];
  };

  const editTitle = e => {
    const newList = replaceIndex(issueList, index, {
      ...item,
      title: e.target.value,
    });
    setIssueList(newList);
  };

  const editText = e => {
    const newList = replaceIndex(issueList, index, {
      ...item,
      content: e.target.value,
    });
    setIssueList(newList);
  };

  const handleResizeHeight = useCallback(() => {
    if (ref == null || ref.current == null) {
      return;
    }
    ref.current.style.height = '70px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);

  const changeItemStatus = (selectedItem, newStatus) => {
    setIssueList(prevList =>
      prevList.map(item =>
        item.issueId === selectedItem.issueId
          ? { ...item, status: newStatus }
          : item,
      ),
    );
  };

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'card',
    item: item,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        changeItemStatus(item, dropResult.name);
      }
    },
  }));

  const onClick = e => {
    e.preventDefault();
    navigate(`/issue/${item.issueId}`);
  };

  useEffect(() => {
    console.log(item);
    setCardColor(cardColor[item.status]);
  }, []);

  return (
    item && (
      <div
        className={styles.cardWrap}
        ref={dragRef}
        style={{
          opacity: isDragging ? '0.3' : '1',
          boxShadow: `1px 1px 5px 0.1px ${cardColor}`,
        }}
        onClick={onClick}
      >
        <div className={styles.cardHeaderWrap}>
          <h5>{item.title}</h5>
        </div>
        <div className={styles.memberInfo}>
          {item.assigneeInfoList &&
            item.assigneeInfoList.map(image => (
              <UserIcon key={image.id} src={image.img} alt={image.name} />
            ))}
        </div>
      </div>
    )
  );
}

export default React.memo(KanbanIssueItem);

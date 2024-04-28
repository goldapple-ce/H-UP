import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { kanbanListState } from '../../recoil/recoil';
import React from 'react';
import './KanbanCreator.module.scss';

function KanbanCreator({ title }) {
  const [kanbanList, setKanbanList] = useRecoilState(kanbanListState);

  const getId =
    kanbanList.length > 0 ? kanbanList[kanbanList.length - 1].id + 1 : 0;

  const addCard = useCallback(
    (e) => {
      setKanbanList((prev) => [
        ...prev,
        {
          id: getId,
          title: '',
          content: '',
          category: title,
          isChecked: false,
        },
      ]);
    },
    [getId, setKanbanList, title]
  );

  return (
    <div className="addBtnWrap">
      <button className="cardAddBtn" onClick={addCard}>
        + Add task
      </button>
    </div>
  );
}

export default React.memo(KanbanCreator);
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { issueListState } from '../../recoil/recoil';
import React from 'react';
import './KanbanCreator.module.scss';

function KanbanCreator({ title }) {
  const [kanbanList, setKanbanList] = useRecoilState(issueListState);

  const getId =
    kanbanList.length > 0 ? kanbanList[kanbanList.length - 1].id + 1 : 0;

  const addCard = useCallback(
    (e) => {
      setKanbanList((prev) => [
        ...prev,
        {
          issueId: getId,
          title: '',
          startDate: new Date(),
          endDate: new Date(),
          status: title,
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
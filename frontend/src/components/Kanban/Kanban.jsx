import { useRecoilValue } from 'recoil';
import KanbanList from '../Kanban/KanbanList';
import Card from '../Kanban/Card';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { issueListState } from '../../recoil/recoil';
import styles from './Kanban.module.scss'
import { useState } from 'react';

function Kanban() {
  const kanbanList = useRecoilValue(issueListState);
  const { TO_DO, IN_PROGRESS, DONE, NOTE } = TITLE_NAME;
  const [selectedCategory, setSelectedCategory] = useState('TO_DO'); // Initial selected category

  const cardDataHandler = (cardTitle) => {
    return kanbanList
      .filter((data) => data.category === cardTitle)
      .map((item, index) => <Card key={item.id} item={item} />);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <div className={styles.cardDataHandler}>
      <div className="category-dropdown">
        <label htmlFor="category-select">Category:</label>
        <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="TO_DO">할 일</option>
          <option value="ISSUE">이슈</option>
        </select>
      </div>
        <input placeholder='검색'></input>
        {/* <div> 담당자들 이미지 리스트 </div> */}
      </div>
      <section className={styles.kanbanListContainer}>
        <DndProvider backend={HTML5Backend}>
          <KanbanList title={TO_DO}>{cardDataHandler(TO_DO)}</KanbanList>
          <KanbanList title={IN_PROGRESS}>
            {cardDataHandler(IN_PROGRESS)}
          </KanbanList>
          <KanbanList title={NOTE}>{cardDataHandler(NOTE)}</KanbanList>
          <KanbanList title={DONE}>{cardDataHandler(DONE)}</KanbanList>
        </DndProvider>
      </section>
    </div>
  );
}

export default Kanban;

export const TITLE_NAME = {
  TO_DO: '발의됨',
  IN_PROGRESS: '진행중',
  DONE: '완료',
  NOTE: '선택됨',
};
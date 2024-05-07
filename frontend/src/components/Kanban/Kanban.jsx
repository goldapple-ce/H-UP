import { useRecoilValue } from 'recoil';
import KanbanList from '../Kanban/KanbanList';
import Card from '../Kanban/Card';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { issueListState } from '../../recoil/recoil';
import styles from './Kanban.module.scss'
import { useEffect, useState } from 'react';

function Kanban() {
  const kanbanList = useRecoilValue(issueListState);
  const { TO_DO, IN_PROGRESS, DONE, NOTE } = TITLE_NAME;
  const [selectedCategory, setSelectedCategory] = useState('TO_DO'); // Initial selected category
  const [searchInput, setSearchInput] = useState('');
  const [items, setItems] = useState([])

  const cardDataHandler = (cardTitle) => {
    return kanbanList
      .filter((data) => data.progress === cardTitle && data.title.toLowerCase().includes(searchInput))
      .map((item, index) => <Card key={item.id} item={item} />);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
  }



  return (
    <div>
      <div className={styles.header}>
        <div>
          <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="TO_DO">할 일</option>
            <option value="ISSUE">이슈</option>
          </select>
          <span class={styles.header__arrow}>
            {/* <img src={DoubleArrow} alt=""/> */}
          </span>
        </div>
        <input className={styles.header__search} placeholder='검색' onChange={(e) => {searchItems(e.target.value.toLowerCase())}}/>
        <div className={styles.header__imageSet}>
          {
            kanbanList.reduce((uniqueImages, data) => {
              data.imageList.map((image) => {
                if (!uniqueImages.some((prevImage) => prevImage.src === image.src))
                  uniqueImages.push(image);
              })
              return uniqueImages;
            }, []).map((image) => (
              <img id={image.id} src={image.src} alt={image.alt}/>
            ))
          }
        </div>
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
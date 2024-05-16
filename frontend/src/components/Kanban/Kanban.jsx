import Input from '@component/common/Input';
import UserIcon from '@component/common/UserIcon';
import { STATUS } from '@constant/status';
import useInput from '@hook/useInput';
import { issueState } from '@recoil/issue';
import { todoState } from '@recoil/todo';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRecoilState } from 'recoil';
import styles from './Kanban.module.scss';
import KanbanIssueItem from './KanbanIssueItem';
import KanbanList from './KanbanList';
import KanbanTodoItem from './KanbanTodoItem';

export default function Kanban() {
  const { CREATED, SELECTED, PROGRESS, COMPLETED } = STATUS;
  const [issueList] = useRecoilState(issueState);
  const [todoList] = useRecoilState(todoState);
  const [kanbanList, setKanbanList] = useState();

  const [selectedCategory, setSelectedCategory] = useState('ISSUE'); // Initial selected category
  const [items, setItems] = useState([]);
  // const kanbanList = useRecoilValue(fetchListState);
  const { state: searchInput, onChange: onSearchInputChange } = useInput();

  useEffect(() => {
    if (selectedCategory == 'TO_DO') {
      setKanbanList(todoList);
      console.log(kanbanList);
    } else {
      setKanbanList(issueList);
      console.log(kanbanList);
    }
  }, [selectedCategory, issueList, todoList]);

  const cardDataHandler = cardTitle => {
    console.log(kanbanList);
    console.log(cardTitle);
    return kanbanList
      .filter(
        data =>
          data.status === cardTitle &&
          data.title.toLowerCase().includes(searchInput),
      )
      .map(item => {
        if (selectedCategory === 'ISSUE') {
          return <KanbanIssueItem key={item.issueId} item={item} />;
        } else {
          return <KanbanTodoItem key={item.todoId} item={item} />;
        }
      });
  };

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  };

  return (
    kanbanList && (
      <div>
        <div className={styles.header}>
          <div>
            <select
              id='category-select'
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value='TO_DO'>할 일</option>
              <option value='ISSUE'>이슈</option>
            </select>
            <span className={styles.header__arrow}>
              {/* <img src={DoubleArrow} alt='' /> */}
            </span>
          </div>
          <Input
            className={styles.header__search}
            placeholder={'검색'}
            onChange={onSearchInputChange}
          />
          <div className={styles.header__imageSet}>
            {kanbanList
              .reduce((uniqueImages, data) => {
                data.assigneeInfoList.map(info => {
                  console.log(info);
                  const imgUrl = info.img;
                  if (
                    !uniqueImages.some(prevImage => prevImage.id === info.id)
                  ) {
                    uniqueImages.push({
                      img: imgUrl,
                      id: info.id,
                      name: info.name,
                    });
                  }
                });
                return uniqueImages;
              }, [])
              .map(image => (
                <UserIcon key={image.id} src={image.img} alt={image.name} />
              ))}
          </div>
        </div>
        <section className={styles.kanbanListContainer}>
          <DndProvider backend={HTML5Backend}>
            <KanbanList title={CREATED}>{cardDataHandler(CREATED)}</KanbanList>
            <KanbanList title={SELECTED}>
              {cardDataHandler(SELECTED)}
            </KanbanList>
            <KanbanList title={PROGRESS}>
              {cardDataHandler(PROGRESS)}
            </KanbanList>
            <KanbanList title={COMPLETED}>
              {cardDataHandler(COMPLETED)}
            </KanbanList>
          </DndProvider>
        </section>
      </div>
    )
  );
}

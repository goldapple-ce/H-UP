import { useRecoilValue } from 'recoil';
import KanbanList from '../Kanban/KanbanList';
import Card from '../Kanban/Card';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { kanbanListState } from '../../recoil/recoil';
import styles from './Kanban.module.scss'

function Kanban() {
  const kanbanList = useRecoilValue(kanbanListState);
  const { TO_DO, IN_PROGRESS, DONE, NOTE } = TITLE_NAME;

  const cardDataHandler = (cardTitle) => {
    return kanbanList
      .filter((data) => data.category === cardTitle)
      .map((item, index) => <Card key={item.id} item={item} />);
  };

  return (
    <div>
      <header>
        <span className="title">칸반 보드!!!</span>
      </header>
      <section className={styles.kanbanListContainer}>
        <DndProvider backend={HTML5Backend}>
          <KanbanList title={TO_DO}>{cardDataHandler(TO_DO)}</KanbanList>
          <KanbanList title={IN_PROGRESS}>
            {cardDataHandler(IN_PROGRESS)}
          </KanbanList>
          <KanbanList title={DONE}>{cardDataHandler(DONE)}</KanbanList>
          <KanbanList title={NOTE}>{cardDataHandler(NOTE)}</KanbanList>
        </DndProvider>
      </section>
    </div>
  );
}

export default Kanban;

export const TITLE_NAME = {
  TO_DO: 'To do',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
  NOTE: 'Notes & Reference',
};
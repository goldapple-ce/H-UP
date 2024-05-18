import Input from '@component/common/Input';
import UserIcon from '@component/common/UserIcon';
import { STATUS } from '@constant/status';
import useInput from '@hook/useInput';
import { issueState } from '@recoil/issue';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRecoilState } from 'recoil';
import styles from './Kanban.module.scss';
import KanbanIssueItem from './KanbanIssueItem';
import KanbanList from './KanbanList';

export default function Kanban() {
  const { CREATED, SELECTED, PROGRESS, COMPLETED } = STATUS;
  const [issueList] = useRecoilState(issueState);

  const { state: searchInput, onChange: onSearchInputChange } = useInput();

  const cardDataHandler = cardTitle => {
    return issueList
      .filter(
        data =>
          data.status === cardTitle &&
          data.title.toLowerCase().includes(searchInput),
      )
      .map(item => <KanbanIssueItem key={item.issueId} item={item} />);
  };

  return (
    issueList && (
      <div>
        <div className={styles.header}>
          <Input
            className={styles.header__search}
            placeholder={'검색'}
            onChange={onSearchInputChange}
          />
          <div className={styles.header__imageSet}>
            {issueList
              .reduce((uniqueImages, data) => {
                data.assigneeInfoList.map(info => {
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

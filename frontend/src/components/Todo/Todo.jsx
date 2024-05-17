import { GetTodoList, PostTodo } from '@api/services/todoapi';
import { TodoListState } from '@recoil/todolist';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styles from './Todo.module.scss';
import TodoForm from './TodoForm';
import { useEffect, useState } from 'react';

export default function Todo() {
  const [TodoList, setTodoList] = useRecoilState(TodoListState);
  const { projectId } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const getTodoList = async () => {
      const response = await GetTodoList(1);
      const todoList = response.data.todoList;

      const modifiedList = todoList.map(item => {
        const [content, createdAt, endAt] = item.content.split('#$%');
        return { id: item.todoId, content, createdAt, endAt, assigneeList: [] };
      });

      setTodoList(modifiedList);
    };
    getTodoList();
  }, [setTodoList]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const contentAndDate = content + '#$%' + startDate + '#$%' + endDate;
    //console.log(contentAndDate);
    const newTodo = {
      issueId: 1,
      content: contentAndDate,
    };
    await PostTodo(newTodo);
    closeModal();
  };

  return (
    <div className={styles.Todo}>
      <TodoForm TodoList={TodoList} />

      <div>
        <button className={styles.addButton} onClick={openModal}>
          추가
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        ariaHideApp={false}
      >
        <h2 className={styles.modalTitle}>할 일 추가</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <label className={styles.modalLabel}>
            Content:
            <input
              type='text'
              value={content}
              onChange={e => setContent(e.target.value)}
              className={styles.modalInput}
              required
            />
          </label>
          <label className={styles.modalLabel}>
            Start Date:
            <input
              type='date'
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className={styles.modalInput}
              required
            />
          </label>
          <label className={styles.modalLabel}>
            End Date:
            <input
              type='date'
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className={styles.modalInput}
              required
            />
          </label>
          <div className={styles.modalButtons}>
            <button type='submit' className={styles.submitButton}>
              Add
            </button>
            <button
              type='button'
              onClick={closeModal}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

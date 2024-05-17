import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaTimes, FaUser } from 'react-icons/fa'; // 아이콘 추가
import TodoItem from './TodoItem';
import styles from './TodoItem.module.scss'; // 스타일 파일 추가
import {
  DeleteTodo,
  DeleteTotoAssignee,
  GetTodo,
  GetTodoList,
  ModifyTodo,
  PostTodoAssignee,
} from '@api/services/todoapi'; // GetTeamMembers API 추가
import Modal from 'react-modal';
import { authAxios } from '@api/index';

const TodoItemContainer = ({ Todo, setTodoList, projectId }) => {
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [manageModalIsOpen, setManageModalIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [assignees, setAssignees] = useState(Todo.assigneeList || []);
  const [newAssignee, setNewAssignee] = useState('');

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const response = await authAxios.get(
          `https://h-up.site/api/team/members/${projectId}`,
        );
        setTeamMembers(response.data.memberInfoList);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    }
    fetchTeamMembers();
  }, []);

  const handleEdit = async e => {
    e.stopPropagation(); // 부모 요소의 클릭 이벤트를 막기 위해
    // 수정 버튼 클릭 시 수행할 작업
    openModal();

    const response = await GetTodo(Todo.id);

    const [content, createdAt, endAt] = response.data.content.split('#$%');
    setContent(content);
    setStartDate(createdAt);
    setEndDate(endAt);
  };

  const handleDelete = async e => {
    e.stopPropagation(); // 부모 요소의 클릭 이벤트를 막기 위해
    // 삭제 버튼 클릭 시 수행할 작업
    try {
      await DeleteTodo(Todo.id);
      const response = await GetTodoList(1);
      const todoList = response.data.todoInfoList;

      const modifiedList = todoList.map(item => {
        const [content, createdAt, endAt] = item.content.split('#$%');
        return {
          id: item.todoId,
          content,
          createdAt,
          endAt,
          assigneeList: Todo.assigneeList,
        };
      });

      setTodoList(modifiedList);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openManageModal = () => {
    setManageModalIsOpen(true);
  };

  const closeManageModal = () => {
    setManageModalIsOpen(false);
  };

  const handleAddAssignee = async () => {
    if (selectedMember) {
      const response = await GetTodo(Todo.id);
      console.log(response.data);
      await PostTodoAssignee({
        todoId: Todo.id,
        memberIdList: [...response.data.memberInfoList, selectedMember],
      });
      setTeamMembers([...response.data, selectedMember]);
    }
  };

  const handleRemoveAssignee = async index => {
    const ToDeleteAssignee = assignees.filter((_, i) => i === index);
    const DeleteMember = ToDeleteAssignee[0].assigneeId;
    await DeleteTotoAssignee({ todoId: Todo.id, memberId: DeleteMember });

    const response = await authAxios.get(
      `https://h-up.site/api/team/members/${projectId}`,
    );
    setTeamMembers(response.data.memberInfoList);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const contentAndDate = content + '#$%' + startDate + '#$%' + endDate;
    const newTodo = {
      todoId: Todo.id,
      content: content,
      todoStatus: 'PROGRESS',
    };
    await ModifyTodo(newTodo);
    const response = await GetTodoList(projectId);
    const todoList = response.data.todoInfoList;

    const modifiedList = todoList.map(item => {
      const [content, createdAt, endAt] = item.content.split('#$%');
      return {
        id: item.todoId,
        content,
        createdAt,
        endAt,
        assigneeList: Todo.assigneeList,
      };
    });

    setTodoList(modifiedList);
    closeModal();
  };

  return (
    <>
      <div className={styles.todoItemContainer}>
        <TodoItem Todo={Todo} />
        <div className={styles.buttons}>
          <button className={styles.userButton} onClick={openManageModal}>
            <FaUser />
          </button>
          <button className={styles.editButton} onClick={handleEdit}>
            <FaPencilAlt />
          </button>
          <button className={styles.deleteButton} onClick={handleDelete}>
            <FaTimes />
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        ariaHideApp={false}
      >
        <h2 className={styles.modalTitle}>할 일 수정</h2>
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
              Modify
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

      <Modal
        isOpen={manageModalIsOpen}
        onRequestClose={closeManageModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        ariaHideApp={false}
      >
        <h2 className={styles.modalTitle}>인원 관리</h2>
        <form className={styles.modalForm}>
          <label className={styles.modalLabel}>
            Add Assignee:
            <select
              value={selectedMember}
              onChange={e => setSelectedMember(e.target.value)}
              className={styles.modalInput}
            >
              <option value=''>Select a member</option>
              {teamMembers.map((member, index) => (
                <option key={index} value={member}>
                  {member.id}
                </option>
              ))}
            </select>
            <button
              type='button'
              onClick={handleAddAssignee}
              className={styles.addButton}
            >
              Add
            </button>
          </label>
          <ul className={styles.assigneeList}>
            {assignees.map((assignee, index) => (
              <li key={index} className={styles.assigneeItem}>
                {assignee.assigneeId}
                <button
                  type='button'
                  onClick={() => handleRemoveAssignee(index)}
                  className={styles.removeButton}
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.modalButtons}>
            <button
              type='button'
              onClick={closeManageModal}
              className={styles.cancelButton}
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default TodoItemContainer;

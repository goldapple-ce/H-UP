import { requestTeamMemberList } from '@api/services/team';
import {
  requestAssignTodo,
  requestDeleteTodo,
  requestTodoInfo,
  requestTodoList,
  requestUpdateTodo,
} from '@api/services/todo';
import STATUS from '@constant/status';
import { useEffect, useState } from 'react';
import { FaPencilAlt, FaTimes, FaUser } from 'react-icons/fa'; // 아이콘 추가
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import TodoItem from './TodoItem';
import styles from './TodoItem.module.scss'; // 스타일 파일 추가
import { useRecoilState } from 'recoil';
import { infoState } from '@recoil/info';

const TodoItemContainer = ({ todo, projectId }) => {
  const navigate = useNavigate();

  const { CREATED, PROGRESS, SELECTED, COMPLETED } = STATUS;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [manageModalIsOpen, setManageModalIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [assignees, setAssignees] = useState(todo.assigneeList || []);
  const [newAssignee, setNewAssignee] = useState('');
  const [info] = useRecoilState(infoState);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const response = await requestTeamMemberList(info.teamId);
        setTeamMembers(response.data.memberInfoList);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    }
    if (info.teamId != 0) fetchTeamMembers();
  }, [info.teamId]);

  const handleEdit = async e => {
    e.stopPropagation(); // 부모 요소의 클릭 이벤트를 막기 위해
    // 수정 버튼 클릭 시 수행할 작업
    openModal();

    const response = requestTodoList(projectId);

    const [content, createdAt, endAt] = response.data.content.split('#$%');
    setContent(content);
    setStartDate(createdAt);
    setEndDate(endAt);
  };

  const handleDelete = async e => {
    e.stopPropagation(); // 부모 요소의 클릭 이벤트를 막기 위해
    // 삭제 버튼 클릭 시 수행할 작업
    try {
      requestDeleteTodo(todo.todoId);
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
      const response = requestTodoInfo(todo.todoId);
      console.log(response.data);
      requestAssignTodo({
        todoId: todo.id,
        memberIdList: [...response.data.memberInfoList, selectedMember],
      });
      setTeamMembers([...response.data, selectedMember]);
    }
  };

  const handleRemoveAssignee = async index => {
    const ToDeleteAssignee = assignees.filter((_, i) => i === index);
    const DeleteMember = ToDeleteAssignee[0].assigneeId;
    requestDeleteTodo({ todoId: todo.todoId, memberId: DeleteMember });

    const response = requestTeamMemberList(teamId);
    setTeamMembers(response.data.memberInfoList);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newTodo = {
      todoId: todo.id,
      content: content,
      todoStatus: 'CREATED',
    };
    requestUpdateTodo(newTodo);
    setTodoList(response.data.todoInfoList);
    closeModal();
  };

  return (
    <>
      <div className={styles.todoItemContainer}>
        <TodoItem todo={todo} />
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

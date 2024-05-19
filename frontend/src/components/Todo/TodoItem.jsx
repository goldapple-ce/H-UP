import { requestTeamMemberList } from '@api/services/team';
import {
  requestAssignTodo,
  requestDeleteTodo,
  requestTodoInfo,
  requestUpdateTodo,
} from '@api/services/todo';
import checkIcon from '@asset/img/check_icon.png';
import pauseIcon from '@asset/img/pause_icon.png';
import playIcon from '@asset/img/play_icon.png';
import upArrowIcon from '@asset/img/up_arrow_icon.png';
import UserIcon from '@component/common/UserIcon';
import STATUS from '@constant/status';
import { teamIdState } from '@recoil/commonPersist';
import { useEffect, useState } from 'react';
import { CaretRightFill } from 'react-bootstrap-icons';
import { FaPencilAlt, FaTimes, FaUser } from 'react-icons/fa';
import { Modal } from 'react-modal';
import { useRecoilState } from 'recoil';
import styles from './TodoItem.module.scss';

const TodoItem = ({ todo }) => {
  const { content, status, requesterInfo, assigneeInfo } = todo;
  const { CREATED, SELECTED, PROGRESS, COMPLETED } = STATUS;
  const [iconImage, setIconImage] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [manageModalIsOpen, setManageModalIsOpen] = useState(false);

  const [newContent, setNewContent] = useState(content);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [assignees, setAssignees] = useState(todo.assigneeList || []);
  const [newAssignee, setNewAssignee] = useState('');

  const [teamId] = useRecoilState(teamIdState);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await requestTeamMemberList(teamId);
        const { memberInfoList } = response.data;
        if (Array.isArray(memberInfoList) && memberInfoList.length > 0)
          setTeamMembers(memberInfoList);
      } catch (e) {
        console.log(
          'error occured while fetching team members at todoItem : ' + e,
        );
        setTeamMembers([]);
      }
    };
    fetchTeamMembers();
  }, []);

  useEffect(() => {
    switch (status) {
      case CREATED:
        setIconImage(upArrowIcon);
        break;
      case PROGRESS:
        setIconImage(playIcon);
        break;
      case COMPLETED:
        setIconImage(checkIcon);
        break;
      case SELECTED:
        setIconImage(pauseIcon);
        break;
    }
  }, [status]);

  const handleEdit = async e => {
    e.stopPropagation(); // 부모 요소의 클릭 이벤트를 막기 위해
    // 수정 버튼 클릭 시 수행할 작업
    openModal();
  };

  // 삭제
  const handleDelete = async e => {
    e.stopPropagation(); // 부모 요소의 클릭 이벤트를 막기 위해
    // 삭제 버튼 클릭 시 수행할 작업
    try {
      await requestDeleteTodo(todo.todoId);
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

  // 할당자 할당
  const handleAddAssignee = async () => {
    if (selectedMember) {
      const response = requestTodoInfo(todo.todoId);
      console.log(response.data);
      requestAssignTodo({
        todoId: todo.id,
        memberIdList: [...response.data.memberInfoList, selectedMember],
      });
    } else {
      window.alert('할당자를 추가해주세요 !');
    }
  };

  // 할당자 제거
  const handleRemoveAssignee = async index => {
    const ToDeleteAssignee = assignees.filter((_, i) => i === index);
    const DeleteMember = ToDeleteAssignee[0].assigneeId;
    requestDeleteTodo({ todoId: todo.todoId, memberId: DeleteMember });
  };

  // 수정
  const handleSubmit = async e => {
    e.preventDefault();
    const newTodo = {
      todoId: todo.id,
      content: newContent,
      todoStatus: todo.status,
    };
    await requestUpdateTodo(newTodo);
    closeModal();
  };

  return (
    <>
      <div className={styles.Todo}>
        <div className={styles.Todo_header}>
          <img src={playIcon} alt='' />
          <h5>{content}</h5>
        </div>
        <div>
          <UserIcon
            className={styles.Todo__assignee}
            key={requesterInfo.id}
            src={requesterInfo.img}
            alt={requesterInfo.name}
          />
          <CaretRightFill className={styles.caret} />
          <UserIcon
            className={styles.Todo__assignee}
            key={assigneeInfo.id}
            src={assigneeInfo.img}
            alt={assigneeInfo.name}
          />
        </div>
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
    </>
  );
};

export default TodoItem;

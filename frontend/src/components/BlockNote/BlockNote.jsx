import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
} from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from '@blocknote/react';
import { authState } from '@recoil/auth';
import { Stomp } from '@stomp/stompjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import Modal from 'react-modal';
import { useRecoilState } from 'recoil';
import SockJS from 'sockjs-client';
import * as Y from 'yjs';
import styles from './EditorModal.module.scss';
import './IssueEditorPageBlockNote.css';
//import { RiAlertFill } from "react-icons/ri";
import { requestIssueDetail } from '@api/services/issue';
import { requestTeamMemberList } from '@api/services/team';
import { FaTimes } from 'react-icons/fa'; // 아이콘 추가
import { Agenda, Alert, Mention } from './Alert';
import { requestAssignTodo, requestSaveTodo } from '@api/services/todo';
import { teamIdState } from '@recoil/commonPersist';
import { AddAgendaAssignee, createAgenda } from '@api/services/agenda';

const formatToDate = jsDateStr => {
  const date = new Date(jsDateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // const hour = date.getHours();
  // const minutes = date.getMinutes();
  // const formattedDate = `${year}년 ${month}월 ${day}일 ${hour}:${minutes}`;
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the Alert block.
    alert: Alert,
    agenda: Agenda,
  },
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    mention: Mention,
  },
});

// Slash menu item to insert an Alert block
// const insertToggle = (editor) => ({
//   title: "Toggle",
//   onItemClick: () => {
//     insertOrUpdateBlock(editor, {
//       type: "alert",
//     });
//   },
//   aliases: [
//     "alert",
//     "notification",
//     "emphasize",
//     "warning",
//     "error",
//     "info",
//     "success",
//   ],
//   group: "Other",
//   icon: <RiAlertFill />,
// });

let messageId = 0;
let pendingUpdates = {};

// Uploads a file to tmpfiles.org and returns the URL to the uploaded file.
async function uploadFile(file) {
  const body = new FormData();
  body.append('file', file);

  const ret = await fetch('https://tmpfiles.org/api/v1/upload', {
    method: 'POST',
    body: body,
  });
  return (await ret.json()).data.url.replace(
    'tmpfiles.org/',
    'tmpfiles.org/dl/',
  );
}

const BlockNote = ({ issueId }) => {
  const [teamId] = useRecoilState(teamIdState);
  const [userInfo] = useRecoilState(authState);
  const stompClient = useRef(null);
  const ydoc = useRef(new Y.Doc()).current;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [assignees, setAssignees] = useState([]);
  const [newAssignee, setNewAssignee] = useState('');
  const [title, setTitle] = useState('');

  // agenda 관련
  const [agendaModalIsOpen, setAgendaModalIsOpen] = useState(false);
  const [agendaContent, setAgendaContent] = useState('');
  const [agendaAssignees, setAgendaAssignees] = useState([]);
  const [agendaSelectedMember, setAgendaSelectedMember] = useState('');
  const [userName, setUserName] = useState('');
  const [userImg, setUserImg] = useState('');

  const setUser = () => {
    for (let i = 0; i < teamMembers.length; ++i) {
      if (teamMembers[i].id === userInfo.memberId) {
        setUserName(teamMembers[i].name);
        setUserImg(teamMembers[i].img);
      }
    }
  }

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        if (teamId != 0) {
          const response = await requestTeamMemberList(teamId);
          setTeamMembers(response.data.memberInfoList);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    }
    fetchTeamMembers();

  }, [teamId]);

  useEffect(() => {
    if (teamMembers.length > 0) {
      setUser();
    }
  }, [teamMembers]);

  const handleAddAssignee = async selectedMember => {
    if (selectedMember && !assignees.includes(selectedMember)) {
      const addObject = JSON.parse(selectedMember);
      setAssignees([addObject]);
    }
  };

  const handleRemoveAssignee = async index => {
    const ToDeleteAssignee = assignees.filter((_, i) => i !== index);
    setAssignees(ToDeleteAssignee);
  };

  // Custom Slash Menu item to insert a block after the current one.
  const insertTodo = editor => ({
    title: 'Make Todolist',
    onItemClick: openModal,
    aliases: ['todolist', 'todo'],
    group: 'Other',
    icon: <HiOutlineGlobeAlt size={18} />,
    subtext: 'Making TodoList',
  });

  // List containing all default Slash Menu Items, as well as our custom one.
  const getCustomSlashMenuItems = editor => [
    ...getDefaultReactSlashMenuItems(editor),
    insertTodo(editor),
    insertAgenda(editor),
  ];

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAssignees([]);
    setSelectedMember('');
    setContent('');
  };

  const insertTodoBlock = (editor, block) => {
    const currentBlock = editor.getTextCursorPosition().block;
    editor.updateBlock(currentBlock, block);

    //editor.insertBlock(block);
  };

  const insertAlert = editor => ({
    title: 'Todo',
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: 'alert',
      });
    },
    aliases: [
      'alert',
      'notification',
      'emphasize',
      'warning',
      'error',
      'info',
      'success',
    ],
    group: 'Other',
    icon: <RiAlertFill />,
  });

  const handleSubmit = async e => {
    e.preventDefault();
    //console.log(contentAndDate);
    const newTodo = {
      issueId: issueId,
      content: content,
    };
    const response = await requestSaveTodo(newTodo);
    console.log(response);

    for (let i = 0; i < assignees.length; ++i) {
      const data = {
        todoId: response.data.todoId,
        memberId: assignees[i].id,
      };
      requestAssignTodo(data);
    }

    let newTodoBlock = {
      type: 'alert',
      content,
      props: { mention: assignees[0].name },
    };

    if (assignees[0].img) {
      newTodoBlock = {
        type: 'alert',
        content,
        props: { mention: assignees[0].name, img: assignees[0].img },
      };
    }
    closeModal();
    insertTodoBlock(editor, newTodoBlock);
  };

  // Agenda 관련

  const insertAgendaBlock = (editor, block) => {
    const currentBlock = editor.getTextCursorPosition().block;
    editor.updateBlock(currentBlock, block);
  };

  const insertAgenda = editor => ({
    title: 'Make Agenda',
    onItemClick: openAgendaModal,
    aliases: ['Agenda', 'agenda'],
    group: 'Other',
    icon: <HiOutlineGlobeAlt size={18} />,
    subtext: 'Making Agenda',
  });

  const handleAddAgendaAssignee = async agendaSelectedMember => {
    if (
      agendaSelectedMember &&
      !agendaAssignees.includes(agendaSelectedMember)
    ) {
      const addObject = JSON.parse(agendaSelectedMember);
      setAgendaAssignees([addObject]);
    }
  };

  const handleRemoveAgendaAssignee = async index => {
    const ToDeleteAssignee = agendaAssignees.filter((_, i) => i !== index);
    setAgendaAssignees(ToDeleteAssignee);
  };

  const openAgendaModal = () => {
    setAgendaModalIsOpen(true);
  };

  const closeAgendaModal = () => {
    setAgendaModalIsOpen(false);
    setAgendaContent('');
    setAgendaSelectedMember('');
    setAgendaAssignees([]);
  };

  const handleAgendaSubmit = async e => {
    e.preventDefault();
    makeAgenda();
  };

  const makeAgenda = async () => {
    const newAgenda = {
      issueId: issueId,
      content: agendaContent,
    };

    const response = await createAgenda(newAgenda);
    const agendaId = response.data.id;

    for (let i = 0; i < agendaAssignees.length; ++i) {
      const data = {
        agendaId: agendaId,
        memberId: agendaAssignees[i].id,
      };
      await AddAgendaAssignee(data);
    }

    let newAgendaBlock = {
      type: 'agenda',
      content: agendaContent,
      props: { assignee: agendaAssignees[0].name, mention: userName },
    };

    if (agendaAssignees[0].img) {
      newAgendaBlock = {
        ...newAgendaBlock,
        props: { ...newAgendaBlock.props, assigneeimg: agendaAssignees[0].img },
      };
    }

    if (userImg) {
      newAgendaBlock = {
        ...newAgendaBlock,
        props: { ...newAgendaBlock.props, mentionimg: userImg },
      };
    }
    closeAgendaModal();
    insertAgendaBlock(editor, newAgendaBlock);
  };

  const editor = useCreateBlockNote({
    schema,
    collaboration: {
      fragment: ydoc.getXmlFragment('co-work'),
    },
    uploadFile,
  });

  //   useEffect(() => {
  //     initializeAxios(token);
  //   }, [token]);

  // Fetch initial content and set up document
  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await requestIssueDetail(issueId);
        //console.log("res = " ,response.data.content);
        const contentData = JSON.parse(response.data.content);
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
        setTitle(response.data.title);
        //console.log("content = ", contentData);
        if (Array.isArray(contentData)) {
          //console.log("Uint : " , new Uint8Array(contentData));
          Y.applyUpdate(ydoc, new Uint8Array(contentData));
          const xmlText = ydoc.getText('prosemirror');
        } else {
          console.error('Invalid initial content format');
        }
      } catch (error) {
        console.error('Error fetching initial content:', error);
      }
    }
    fetchContent();
  }, [issueId]);

  // Setup WebSocket connection and handlers
  useEffect(() => {
    const sock = new SockJS('https://h-up.site/api/ws');

    stompClient.current = Stomp.over(sock);
    stompClient.current.debug = () => {};
    stompClient.current.connect(
      {},
      () => {
        stompClient.current.subscribe(`/sub/documents/${issueId}`, message => {
          try {
            const payload = JSON.parse(message.body);
            const content = JSON.parse(payload.content); // 내용 (Uint8Array 형식)
            const chunkNum = JSON.parse(payload.chunkNum); // 청크 순서
            const totalChunks = JSON.parse(payload.totalChunks); // 총 청크 수
            const messageId = JSON.parse(payload.messageId); // 메시지 순서

            if (content && Array.isArray(content)) {
              if (!pendingUpdates[messageId]) {
                pendingUpdates[messageId] = new Array(totalChunks).fill(null);
              }
              pendingUpdates[messageId][chunkNum] = new Array(content);

              if (!pendingUpdates[messageId].includes(null)) {
                const concatenated = pendingUpdates[messageId].reduce(
                  (acc, val) => acc.concat(val),
                  [],
                );
                const update = [];

                for (let i = 0; i < totalChunks; i++) {
                  update.push(...concatenated[i]);
                }

                const newUpdate = new Uint8Array(update);

                Y.applyUpdate(ydoc, newUpdate, 'remote');
                delete pendingUpdates[messageId];
              }
            } else {
              console.error('Invalid update format');
            }
          } catch (error) {
            console.error('Error applying updates:', error);
          }
        });

        stompClient.current.send(
          `/pub/connection`,
          {},
          JSON.stringify({ documentsId: issueId, memberId: userInfo.memberId }),
        );
      },
      error => {
        console.error('Could not connect to STOMP server', error);
      },
    );

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
      }
    };
  }, [issueId, ydoc, userInfo.memberId]);

  const timeoutRef = useRef(null);

  const handleEditorChange = useCallback(() => {
    try {
      // 이전 타이머가 있다면 취소
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 0.2초 후에 handleEditorChange 함수를 실행
      timeoutRef.current = setTimeout(() => {
        // Encode Yjs document state to Uint8Array
        const updateArray = Y.encodeStateAsUpdate(ydoc);

        // Optionally send the encoded state to server
        if (stompClient.current && stompClient.current.connected) {
          chunkMessage(updateArray);
        }
      }, 200);
    } catch (error) {
      console.error('Error handling editor change:', error);
    }
  }, [ydoc, userInfo.memberId, issueId]);

  function chunkMessage(update) {
    const updateArray = Array.from(update);
    const totalChunks = Math.max(1, Math.ceil(updateArray.length / 3000));

    for (let i = 0; i < totalChunks; i++) {
      const chunk = updateArray.slice(i * 3000, (i + 1) * 3000);
      const chunkInfo = {
        chunkNum: i,
        totalChunks: totalChunks,
        messageId: messageId,
        content: JSON.stringify(chunk),
      };
      stompClient.current.send(
        `/pub/documents`,
        {},
        JSON.stringify({
          documentsId: issueId,
          memberId: userInfo.memberId,
          messageChunkInfo: chunkInfo,
        }),
      );
    }
    messageId++;
  }

  return (
    <div className={styles.editorcontainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title ? title : '제목 없음'}</h1>
        <div className={styles.dateContainer}>
          <span className={styles.date}>
            Start: {startDate ? formatToDate(startDate) : '1970-01-01'}
          </span>

          <span className={styles.date}>
            End: {endDate ? formatToDate(endDate) : '1970-01-01'}
          </span>
        </div>
      </div>

      <BlockNoteView
        editor={editor}
        slashMenu={false}
        onChange={handleEditorChange}
        data-theming-css-variables-demo
      >
        <SuggestionMenuController
          triggerCharacter={'/'}
          // Replaces the default Slash Menu items with our custom ones.
          getItems={async query =>
            filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }
        />
      </BlockNoteView>

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
            <input
              type='text'
              value={content}
              onChange={e => setContent(e.target.value)}
              className={styles.modalInput}
              placeholder='할 일 내용을 입력해주세요.'
              required
            />
          </label>

          <label className={styles.modalLabel}>
            <select
              value={selectedMember}
              onChange={e => {
                setSelectedMember(e.target.value);
                handleAddAssignee(e.target.value);
              }}
              className={styles.modalInput}
            >
              <option value=''>팀원을 선택해주세요.</option>
              {teamMembers.map((member, index) => (
                <option key={index} value={JSON.stringify(member)}>
                  {member.name}
                </option>
              ))}
            </select>
          </label>
          <ul className={styles.assigneeList}>
            {assignees.map((assignee, index) => (
              <li key={index} className={styles.assigneeItem}>
                <div className={styles.assigneeContainer}>
                  <img
                    className={styles.assigneeImg}
                    src='https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800'
                    alt='Profile Image'
                  />
                  <div> {assignee.name}</div>
                  <div className={styles.removeButtonWrapper}>
                    <button
                      type='button'
                      onClick={() => handleRemoveAssignee(index)}
                      className={styles.removeButton}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.modalButtons}>
            <button type='submit' className={styles.submitButton}>
              생성
            </button>
            <button
              type='button'
              onClick={closeModal}
              className={styles.cancelButton}
            >
              취소
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={agendaModalIsOpen}
        onRequestClose={closeAgendaModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        ariaHideApp={false}
      >
        <h2 className={styles.modalTitle}>의사결정 요청</h2>
        <form onSubmit={handleAgendaSubmit} className={styles.modalForm}>
          <label className={styles.modalLabel}>
            <input
              type='text'
              value={agendaContent}
              onChange={e => setAgendaContent(e.target.value)}
              className={styles.modalInput}
              placeholder='의사 결정 내용을 입력해주세요.'
              required
            />
          </label>

          <label className={styles.modalLabel}>
            <select
              value={agendaSelectedMember}
              onChange={e => {
                setAgendaSelectedMember(e.target.value);
                handleAddAgendaAssignee(e.target.value);
              }}
              className={styles.modalInput}
            >
              <option value=''>팀원을 선택해주세요.</option>
              {teamMembers.map((member, index) => (
                <option key={index} value={JSON.stringify(member)}>
                  {member.name}
                </option>
              ))}
            </select>
          </label>

          <ul className={styles.assigneeList}>
            {agendaAssignees.map((assignee, index) => (
              <li key={index} className={styles.assigneeItem}>
                <div className={styles.assigneeContainer}>
                  <img
                    className={styles.assigneeImg}
                    src='https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800'
                    alt='Profile Image'
                  />
                  <div> {assignee.name}</div>
                  <div className={styles.removeButtonWrapper}>
                    <button
                      type='button'
                      onClick={() => handleRemoveAgendaAssignee(index)}
                      className={styles.removeButton}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.modalButtons}>
            <button type='submit' className={styles.submitButton}>
              생성
            </button>
            <button
              type='button'
              onClick={closeAgendaModal}
              className={styles.cancelButton}
            >
              취소
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BlockNote;

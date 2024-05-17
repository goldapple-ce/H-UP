import {
  BlockNoteSchema,
  defaultBlockSpecs,
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
import styles from '../Todo/Todo.module.scss';
import './IssueEditorPageBlockNote.css';
//import { RiAlertFill } from "react-icons/ri";
import { requestIssueDetail } from '@api/services/issue';
import { requestTeamMemberList } from '@api/services/team';
import { infoState } from '@recoil/info';
import { FaTimes } from 'react-icons/fa'; // 아이콘 추가
import { Alert } from './Alert';
import { requestAssignTodo, requestSaveTodo } from '@api/services/todo';

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the Alert block.
    alert: Alert,
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
  const [info] = useRecoilState(infoState);
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

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        if (info.teamId != 0) {
          console.log(info.teamId);
          const response = await requestTeamMemberList(info.teamId);
          console.log(response.data);
          setTeamMembers(response.data.memberInfoList);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    }
    fetchTeamMembers();
  }, []);

  const handleAddAssignee = async () => {
    if (selectedMember && !assignees.includes(selectedMember)) {
      const addObject = JSON.parse(selectedMember);
      setAssignees([...assignees, addObject]);
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
    //insertToggle(editor)
  ];

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const insertTodoBlock = (editor, block) => {
    const currentBlock = editor.getTextCursorPosition().block;
    editor.updateBlock(currentBlock, block);
  };

  const insertAlert = editor => ({
    title: 'Alert',
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

    for (let i = 0; i < assignees.length; ++i) {
      const data = {
        todoId: response.data.todoId,
        memberId: assignees[i].id,
      };
      requestAssignTodo(data);
    }

    const newTodoBlock = {
      type: 'alert',
      content: content,
    };
    closeModal();
    insertTodoBlock(editor, newTodoBlock);
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
  // useEffect(() => {
  //   async function fetchContent() {
  //     try {
  //       const response = requestIssueDetail(issueId);
  //       console.log(response.data);
  //       //console.log("res = " ,response.data.content);
  //       const contentData = JSON.parse(response.data.content);
  //       //console.log("content = ", contentData);
  //       if (Array.isArray(contentData)) {
  //         //console.log("Uint : " , new Uint8Array(contentData));
  //         Y.applyUpdate(ydoc, new Uint8Array(contentData));
  //         const xmlText = ydoc.getText('prosemirror');
  //       } else {
  //         console.error('Invalid initial content format');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching initial content:', error);
  //     }
  //   }
  //   fetchContent();
  // }, [issueId]);

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
    <>
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
            Content:
            <input
              type='text'
              value={content}
              onChange={e => setContent(e.target.value)}
              className={styles.modalInput}
              required
            />
          </label>

          <h2 className={styles.modalTitle}>인원 관리</h2>
          <label className={styles.modalLabel}>
            Add Assignee:
            <select
              value={selectedMember}
              onChange={e => setSelectedMember(e.target.value)}
              className={styles.modalInput}
            >
              <option value=''>Select a member</option>
              {teamMembers.map((member, index) => (
                <option key={index} value={JSON.stringify(member)}>
                  {member.name}
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
                {assignee.name}
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
    </>
  );
};

export default BlockNote;

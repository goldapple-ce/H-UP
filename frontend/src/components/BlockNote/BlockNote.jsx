import {
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
} from "@blocknote/core";
import { LoadIssueData } from '@api/services/issue';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { authState } from '@recoil/auth';
import Modal from 'react-modal';
import { Stomp } from '@stomp/stompjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import SockJS from 'sockjs-client';
import * as Y from 'yjs';
import './IssueEditorPageBlockNote.css';
import styles from '../Todo/Todo.module.scss';
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { PostTodo } from "@api/services/todoapi";
//import { RiAlertFill } from "react-icons/ri";
import { ToggleType } from "./ToggleType";



const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the Alert block.
    alert: ToggleType,
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

// Uploads a file to tmpfiles.org and returns the URL to the uploaded file.
async function uploadFile(file) {
  const body = new FormData();
  body.append("file", file);
 
  const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: body,
  });
  return (await ret.json()).data.url.replace(
    "tmpfiles.org/",
    "tmpfiles.org/dl/"
  );
}

const BlockNote = ({ id }) => {
  
  const [userInfo] = useRecoilState(authState);
  const stompClient = useRef(null);
  const ydoc = useRef(new Y.Doc()).current;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Custom Slash Menu item to insert a block after the current one.
const insertTodo = (editor) => ({
  title: "Make Todolist",
  onItemClick: openModal,
  aliases: ["todolist", "todo"],
  group: "Other",
  icon: <HiOutlineGlobeAlt size={18} />,
  subtext: "Making TodoList",
});

// List containing all default Slash Menu Items, as well as our custom one.
const getCustomSlashMenuItems = (
  editor
) => [
  ...getDefaultReactSlashMenuItems(editor),
  insertTodo(editor),
  //insertToggle(editor)
];

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const insertTodoBlock = (editor, block) => {
    const currentBlock = editor.getTextCursorPosition().block;
    editor.insertBlocks([block], currentBlock, "after");
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contentAndDate = content+'#$%'+startDate+'#$%'+endDate;
    //console.log(contentAndDate);
    const newTodo = {
      issueId:1,
      content:contentAndDate
    };
    await PostTodo(newTodo);

    const newTodoBlock = {
      type:"paragraph",
      content: [{type:"alert", content:content}]
    }
    closeModal();
    insertTodoBlock(editor, newTodoBlock);
  }


  const editor = useCreateBlockNote({
    schema,
    collaboration: {
      fragment: ydoc.getXmlFragment('co-work'),
    },
    uploadFile
  });

  //   useEffect(() => {
  //     initializeAxios(token);
  //   }, [token]);

  // Fetch initial content and set up document
  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await LoadIssueData(id);
        const contentData = JSON.parse(response.data.content);
        if (Array.isArray(contentData)) {
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
  }, [id]);

  // Setup WebSocket connection and handlers
  useEffect(() => {
    const sock = new SockJS('https://h-up.site/api/ws');
    stompClient.current = Stomp.over(sock);
    stompClient.current.debug = () => {};
    stompClient.current.connect(
      {},
      () => {
        stompClient.current.subscribe(`/sub/documents/${id}`, message => {
          try {
            const updates = JSON.parse(JSON.parse(message.body).content);
            if (updates && Array.isArray(updates)) {
              const updateArray = new Uint8Array(updates);
              Y.applyUpdate(ydoc, updateArray, 'remote');
            } else {
              console.error('Invalid update format');
            }
          } catch (error) {
            console.error('Error applying updates:', error);
          }
        });

        ydoc.on('update', (update, origin) => {
          if (origin !== 'remote') {
            try {
              const updateArray = Y.encodeStateAsUpdate(ydoc);
              stompClient.current.send(
                `/pub/documents`,
                {},
                JSON.stringify({
                  documentsId: id,
                  memberId: userInfo.memberId,
                  content: JSON.stringify(Array.from(updateArray)),
                }),
              );
            } catch (error) {
              console.error('Error encoding state update:', error);
            }
          }
        });

        stompClient.current.send(
          `/pub/connection`,
          {},
          JSON.stringify({ documentsId: id, memberId: userInfo.memberId }),
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
  }, [id, ydoc, userInfo.memberId]);

  const handleEditorChange = useCallback(
    change => {
      try {
        // Encode Yjs document state to Uint8Array
        const updateArray = Y.encodeStateAsUpdate(ydoc);

        // Optionally send the encoded state to server
        if (stompClient.current && stompClient.current.connected) {
          stompClient.current.send(
            `/pub/documents`,
            {},
            JSON.stringify({
              documentsId: id,
              memberId: userInfo.memberId,
              content: JSON.stringify(Array.from(updateArray)),
            }),
          );
        }
      } catch (error) {
        console.error('Error handling editor change:', error);
      }
    },
    [ydoc, userInfo.memberId, id],
  );

  return (
    <>
        <BlockNoteView editor={editor} slashMenu={false} onChange={handleEditorChange} data-theming-css-variables-demo>
        <SuggestionMenuController
        triggerCharacter={"/"}
        // Replaces the default Slash Menu items with our custom ones.
        getItems={async (query) =>
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
            type="text" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className={styles.modalInput}
            required 
          />
        </label>
        <label className={styles.modalLabel}>
          Start Date:
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            className={styles.modalInput}
            required 
          />
        </label>
        <label className={styles.modalLabel}>
          End Date:
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            className={styles.modalInput}
            required 
          />
        </label>
        <div className={styles.modalButtons}>
          <button type="submit" className={styles.submitButton}>Add</button>
          <button type="button" onClick={closeModal} className={styles.cancelButton}>Cancel</button>
        </div>
      </form>
      </Modal>
    </>
      
  );
}

export default BlockNote;

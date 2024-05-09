import { LoadIssueData } from '@api/services/issue';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { authState } from '@recoil/auth';
import { Stomp } from '@stomp/stompjs';
import { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import SockJS from 'sockjs-client';
import * as Y from 'yjs';
import styles from './IssueEditorPage.module.scss';

function IssueEditorPage() {
  const { id } = useParams();
  const [userInfo] = useRecoilState(authState);
  const stompClient = useRef(null);
  const ydoc = useRef(new Y.Doc()).current;

  const editor = useCreateBlockNote({
    collaboration: {
      fragment: ydoc.getXmlFragment('co-work'),
    },
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
          JSON.stringify({ documentsId: id, memberId }),
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
  }, [id, ydoc]);

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
    <div className={styles.editor_page}>
      <div className={styles.editor_header}>
        <h1>Real-Time Collaborative Editor</h1>
      </div>
      <div className={styles.editor_container}>
        <BlockNoteView editor={editor} onChange={handleEditorChange} />
      </div>
    </div>
  );
}

export default IssueEditorPage;

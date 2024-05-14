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
import './IssueEditorPageBlockNote.css';

let messageId = 0;
let pendingUpdates = {};

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

function BlockNote() {
  const { id } = useParams();
  const [userInfo] = useRecoilState(authState);
  const stompClient = useRef(null);
  const ydoc = useRef(new Y.Doc()).current;

  const editor = useCreateBlockNote({
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
        //console.log("res = " ,response.data.content);
        const contentData = JSON.parse(response.data.content);
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
            const payload = JSON.parse(message.body);
            const content = JSON.parse(payload.content);
            const chunkNum = JSON.parse(payload.chunkNum);
            const totalChunks = JSON.parse(payload.totalChunks);
            const messageId = JSON.parse(payload.messageId);

            if (content && Array.isArray(content)) {

              if (!pendingUpdates[messageId]) {
                pendingUpdates[messageId] = new Array(totalChunks).fill(null);
              }
              pendingUpdates[messageId][chunkNum] = new Array(content);
        
              if (!pendingUpdates[messageId].includes(null)) {
                const concatenated = pendingUpdates[messageId].reduce((acc, val) => acc.concat(val), []);
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

  
    const timeoutRef = useRef(null);
  
    const handleEditorChange = useCallback(() => {
      try {
        // 이전 타이머가 있다면 취소
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
  
        // 1초 후에 handleEditorChange 함수를 실행
        timeoutRef.current = setTimeout(() => {
          // Encode Yjs document state to Uint8Array
          const updateArray = Y.encodeStateAsUpdate(ydoc);
  
          // Optionally send the encoded state to server
          if (stompClient.current && stompClient.current.connected) {
            chunkMessage(updateArray);
          }
        }, 1000);
      } catch (error) {
        console.error('Error handling editor change:', error);
      }
    }, [ydoc, userInfo.memberId, id]);


  function chunkMessage(update) {
    const updateArray = Array.from(update);
    const totalChunks = Math.max(1, Math.ceil(updateArray.length / 3000));

    for (let i = 0; i < totalChunks; i++) {
      const chunk = updateArray.slice(i * 3000, (i + 1) * 3000);
      const chunkInfo = {
        chunkNum: i,
        totalChunks: totalChunks,
        messageId: messageId,
        content: JSON.stringify(chunk)
      };
      stompClient.current.send(
        `/pub/documents`,
        {},
        JSON.stringify({
          documentsId: id,
          memberId: userInfo.memberId,
          messageChunkInfo: chunkInfo,
        }),
      );
    }
    messageId++;
  }

  return <BlockNoteView editor={editor} onChange={handleEditorChange} data-theming-css-variables-demo />;
}

export default BlockNote;

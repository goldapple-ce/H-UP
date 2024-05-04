import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
// import { Collaboration } from '@tiptap/extension-collaboration';
// import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useParams } from 'react-router-dom';
import styles from './IssueEditorPage.module.scss';

function IssueEditorPage() {
    const {id} = useParams();
    //const [client, setClient] = useState(null);
    let stompClient = useRef<Client | null>(null);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            Image
        ],
        content: '<p>Hello World!</p>',
        onUpdate: ({ editor }) => {
          // 변화가 사용자에 의해 발생했다면 서버에 전송
          const json = editor.getJSON();
          
          if (stompClient.current) {
            stompClient.current.publish({
              destination: `/pub/documents`,
              body: JSON.stringify({ documentsId:id, content: json }),
            });
          }
        },
        editorProps: {
          attributes: {
            class: 'my-editor'
          }
        }
      });
    
      useEffect(() => {
        // STOMP client setup
        const sock = new SockJS(`https://h-up.site/api/ws`);
        stompClient = new Client({
            webSocketFactory: () => sock,
            onConnect: () => {
                console.log("Connected to STOMP server");

                stompClient.current.subscribe(`/sub/documents/${id}`, (message) => {
                  const content = JSON.parse(message.body);
                  editor.commands.setContent(content, false); // 변경사항 적용
              });

            },
            onDisconnect: () => {
                console.log("Disconnected from STOMP server");
            }
        });

        stompClient.activate();
        //setClient(stompClient);

        return () => {
            stompClient.deactivate();
        };
    }, [editor, id]);


    return (
      <div className={styles.editor_page}>
      <div className={styles.editor_header}>
        <h1>Real-Time Collaborative Editor</h1>
      </div>
      <div className={styles.editor_container}>
        {editor ? <EditorContent editor={editor} className={styles.tiptap_editor} /> : <p>Loading...</p>}
      </div>
    </div>
    );
}

export default IssueEditorPage;

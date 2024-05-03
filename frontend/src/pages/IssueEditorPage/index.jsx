import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
// import { Collaboration } from '@tiptap/extension-collaboration';
// import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useParams } from 'react-router-dom';
import styles from './IssueEditorPage.module.scss';

function IssueEditorPage() {
    const id = useParams();
    const [client, setClient] = useState(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
              placeholder: 'Start typing something...' // 플레이스홀더 텍스트 설정
            }),
            Link,
            Image
        ],
        content: '<p>Hello World!</p>',
        onUpdate: ({ editor }) => {
          // 변화가 사용자에 의해 발생했다면 서버에 전송
          const json = editor.getJSON();
          client.publish({
              destination: `/pub/document`,
              body: JSON.stringify({ id, content: json }),
          });
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
        const stompClient = new Client({
            webSocketFactory: () => sock,
            onConnect: () => {
                console.log("Connected to STOMP server");

                stompClient.subscribe(`/sub/document/${id}`, (message) => {
                  const { content } = JSON.parse(message.body);
                  if (editor && content) {
                      editor.commands.setContent(content, false); // 변경사항 적용
                  }
              });

            },
            onDisconnect: () => {
                console.log("Disconnected from STOMP server");
            }
        });

        stompClient.activate();
        setClient(stompClient);

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

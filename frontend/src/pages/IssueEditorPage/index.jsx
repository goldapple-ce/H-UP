import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
// import { Collaboration } from '@tiptap/extension-collaboration';
// import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor';
// import { WebsocketProvider } from 'y-websocket';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useParams } from 'react-router-dom';

function IssueEditorPage() {
    const {id} = useParams();
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
        // content: '<p>Hello World!</p>',
        // onUpdate: ({ editor }) => {
        //   const html = editor.getHTML();
        //   console.log(html);  // 실시간으로 변경된 내용을 콘솔에 출력
        // },
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
        const sock = new SockJS(`api/ws/${id}`);
        const stompClient = new Client({
            webSocketFactory: () => sock,
            onConnect: () => {
                console.log("Connected to STOMP server");

                stompClient.subscribe(`/sub/document`, (message) => {
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
    }, [editor]);


    return (
        <div>
            <EditorContent editor={editor} />
        </div>
    );
}

export default IssueEditorPage;

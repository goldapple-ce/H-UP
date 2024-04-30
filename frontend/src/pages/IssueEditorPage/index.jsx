import React, { useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Collaboration } from '@tiptap/extension-collaboration';
import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

function IssueEditorPage() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
              placeholder: 'Start typing something...' // 플레이스홀더 텍스트 설정
            }),
            Link,
            Image,
            Collaboration.configure({
              document: new Y.Doc(),
              field: 'tiptap',  // This should match the room name used on the server-side
            }),
            CollaborationCursor.configure({
              provider: null, // We will configure this in the useEffect
            }),
        ],
        // content: '<p>Hello World!</p>',
        // onUpdate: ({ editor }) => {
        //   const html = editor.getHTML();
        //   console.log(html);  // 실시간으로 변경된 내용을 콘솔에 출력
        // },
        editorProps: {
          attributes: {
            class: 'my-editor'
          }
        }
      });
    
      useEffect(() => {
        if (editor) {
          const ydoc = editor.extensionManager.extensions.find(extension => extension.name === 'collaboration').options.document;
          const provider = new WebsocketProvider('wss://your-websocket-server.com', 'your-room-id', ydoc);
    
          // Update the cursor extension's provider
          const cursorExtension = editor.extensionManager.extensions.find(extension => extension.name === 'collaborationCursor');
          cursorExtension.options.provider = provider;
    
          return () => {
            provider.disconnect();
          };
        }
      }, [editor]);

      if (!editor) {
        return <div>Loading...</div>;
      }
    
      return (
      <div>
        <div>
          <h1>Title</h1>
        </div>

        <div>
          <EditorContent editor={editor} />
        </div>
      </div>  
      )
}

export default IssueEditorPage;

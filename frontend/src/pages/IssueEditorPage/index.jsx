import React from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

function IssueEditorPage() {
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
          const html = editor.getHTML();
          console.log(html);  // 실시간으로 변경된 내용을 콘솔에 출력
        }
      });
    
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

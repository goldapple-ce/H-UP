import React, { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useParams } from 'react-router-dom';
import styles from './IssueEditorPage.module.scss';
import { useSelector } from 'react-redux';

function IssueEditorPage() {
    const { id } = useParams();
    const memberId = useSelector(state => state.auth.memberId);
    const stompClient = useRef(null);

    // 에디터 인스턴스 생성
    const editor = useEditor({
        extensions: [StarterKit, Link, Image],
        content: '<p>Hello World!</p>',
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            const jsonString = JSON.stringify(json);
            if (stompClient.current && stompClient.current.connected) {
                stompClient.current.send(`/pub/documents`, {}, JSON.stringify({ documentsId: id, memberId: memberId, content: jsonString }));
            }
        },
        editorProps: {
            attributes: {
                class: 'my-editor'
            }
        }
    });

    useEffect(() => {
        const sock = new SockJS('https://h-up.site/api/ws');
        stompClient.current = Stomp.over(sock);
        stompClient.current.connect({}, () => {
            console.log("Connected to STOMP server");
            stompClient.current.subscribe(`/sub/documents/${id}`, (message) => {
                const data = JSON.parse(message.body);
                if (editor) {
                    editor.commands.setContent(JSON.parse(data.content), false);
                }
            });

            // Optionally: Send an initial connection message
            stompClient.current.send(`/pub/connection`, {}, JSON.stringify({ documentsId: id, memberId }));
        }, (error) => {
            console.error("Could not connect to STOMP server", error);
        });

        return () => {
            if (stompClient.current && stompClient.current.connected) {
                stompClient.current.send(`/pub/disconnection`, {}, JSON.stringify({ documentsId: id, memberId }));
                stompClient.current.disconnect();
            }
        };
    }, [editor, id, memberId]); // editor를 의존성 배열에 포함

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

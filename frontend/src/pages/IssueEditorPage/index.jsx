import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Stomp } from '@stomp/stompjs';  // Import Stomp
import SockJS from 'sockjs-client';
import { useParams } from 'react-router-dom';
import styles from './IssueEditorPage.module.scss';

function IssueEditorPage() {
    const { id } = useParams();
    const stompClient = useRef(null);
    const editor = useEditor({
        extensions: [StarterKit, Link, Image],
        content: '<p>Hello World!</p>',
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            if (stompClient.current) {
                stompClient.current.send(`/pub/documents`, {}, JSON.stringify({ documentsId: id, content: json }));
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
                const { content } = JSON.parse(message.body);
                editor.commands.setContent(content, false); // Apply changes
            });
        }, (error) => {
            console.error('STOMP error:', error);
        });

        return () => {
            if (stompClient.current) {
                stompClient.current.disconnect(() => {
                    console.log('Disconnected from STOMP server');
                });
            }
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

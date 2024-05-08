import React, { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Collaboration from '@tiptap/extension-collaboration';
import { ySyncPlugin } from 'y-prosemirror';
import * as Y from 'yjs';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './IssueEditorPage.module.scss';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

async function IssueEditorPage() {
    const { id } = useParams();
    const memberId = useSelector(state => state.auth.memberId);
    const stompClient = useRef(null);
    const ydoc = useRef(new Y.Doc()).current;
    //const response = await axios.get(`/api/issue/${id}`);

    // Initialize the editor
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            Image,
            ListItem,
            BulletList,
            OrderedList,
            Collaboration.configure({
                document: ydoc,
                field: 'prosemirror',
            }),
            ySyncPlugin(ydoc.getXmlFragment('prosemirror'))
        ],
        //content: response.data.body.content,
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
                let updates = JSON.parse(message.body).content;
                if (typeof updates === 'string') {
                    updates = JSON.parse(updates);
                }
                if (updates && Array.isArray(updates)) {
                    Y.applyUpdate(ydoc, new Uint8Array(updates), 'remote');
                }
            });

            ydoc.on('update', (update, origin) => {
                if (origin !== 'remote') {
                    const updateArray = Array.from(update);
                    stompClient.current.send(`/pub/documents`, {}, JSON.stringify({
                        documentsId: id,
                        memberId,
                        content: JSON.stringify(updateArray)
                    }));
                }
            });

            stompClient.current.send(`/pub/connection`, {}, JSON.stringify({ documentsId: id, memberId }));
        }, (error) => {
            console.error("Could not connect to STOMP server", error);
        });

        return () => {
            editor?.destroy();
            if (stompClient.current && stompClient.current.connected) {
                stompClient.current.send(`/pub/disconnection`, {}, JSON.stringify({ documentsId: id, memberId }));
                stompClient.current.disconnect();
            }
        };
    }, [editor, id, memberId]);

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

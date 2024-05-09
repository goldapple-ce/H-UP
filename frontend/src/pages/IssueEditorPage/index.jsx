import React, { useEffect, useState, useRef } from 'react';
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
import { api, initializeAxios } from '../../api/instance/api';

function IssueEditorPage() {
    const { id } = useParams();
    const memberId = useSelector(state => state.auth.memberId);
    const token = useSelector(state => state.auth.token);
    const stompClient = useRef(null);
    const ydoc = useRef(new Y.Doc()).current;

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
        editorProps: {
            attributes: {
                class: 'my-editor'
            }
        }
    });

    useEffect(() => {
        initializeAxios(token);
    }, [token]);

    // Fetch initial content and set up document
    useEffect(() => {
        async function fetchContent() {
            const response = await api(process.env.REACT_APP_API_URL + `/api/issue/${id}`);
            const contentData = JSON.parse(response.data.content);
            Y.applyUpdate(ydoc, new Uint8Array(contentData));
        }
        fetchContent();
    }, [id, editor]);

    // Setup WebSocket connection and handlers
    useEffect(() => {
        const sock = new SockJS(process.env.REACT_APP_API_URL + '/api/ws');
        stompClient.current = Stomp.over(sock);
        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/sub/documents/${id}`, (message) => {
                const updates = JSON.parse(message.body).content;
                if (updates) {
                    const updateArray = new Uint8Array(JSON.parse(updates));
                    Y.applyUpdate(ydoc, updateArray, 'remote');
                }
            });

            ydoc.on('update', (update, origin) => {
                if (origin !== 'remote') {
                    const updateArray = Y.encodeStateAsUpdate(ydoc);
                    stompClient.current.send(`/pub/documents`, {}, JSON.stringify({
                        documentsId: id,
                        memberId,
                        content: JSON.stringify(Array.from(updateArray))
                    }));
                }
            });

            stompClient.current.send(`/pub/connection`, {}, JSON.stringify({ documentsId: id, memberId }));
        }, (error) => {
            console.error("Could not connect to STOMP server", error);
        });

        return () => {
            if (editor) {
                editor.destroy();
            }
            if (stompClient.current && stompClient.current.connected) {
                stompClient.current.disconnect();
            }
        };
    }, [id, memberId, ydoc]);

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

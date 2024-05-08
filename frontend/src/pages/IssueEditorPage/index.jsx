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
import { api } from '../../api/instance/api';
import interceptor from '../../api/interceptor/interceptor';

function IssueEditorPage() {
    const { id } = useParams();
    const memberId = useSelector(state => state.auth.memberId);
    const token = useSelector(state => state.auth.token); // 토큰을 여기서 가져옴
    const stompClient = useRef(null);
    const ydoc = useRef(new Y.Doc()).current;
    const [initialContent, setInitialContent] = useState('<p>Hello World!</p>');  // 초기 컨텐츠 상태

    // 에디터 초기화
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
        content: initialContent,  // 초기 컨텐츠 사용
        editorProps: {
            attributes: {
                class: 'my-editor'
            }
        }
    });
    
    useEffect(() => {
            async function fetchContent() {
            const response = await api(`https://h-up.site/api/issue/${id}`);
            console.log('response : ', response);
            const data = response.data;
            setInitialContent(data.body.content);  // 상태 업데이트
        }
        console.log('token: ', token);
        interceptor(api, token); // 토큰을 인터셉터에 전달
        fetchContent();

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
    }, [editor, id, memberId, token]);

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

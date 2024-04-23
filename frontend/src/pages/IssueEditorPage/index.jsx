import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

function IssueEditorPage() {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [initialValue, setValue] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // 외부 데이터 소스나 API에서 데이터를 비동기적으로 불러옵니다.
      // 여기서는 setTimeout을 사용해 비동기 로딩을 시뮬레이션합니다.
      setTimeout(() => {
        const fetchedData = [
          {
            type: 'paragraph',
            children: [{ text: '이곳에 텍스트를 입력하세요...' }],
          },
        ];
        setValue(fetchedData);
        setLoading(false);
      }, 2000); // 2초 후 데이터 로딩 완료
    }, []); // 의존성 배열을 비워서 컴포넌트 마운트 시에만 실행됩니다.

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <pre {...props.attributes}>{props.children}</pre>;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  const renderLeaf = useCallback(props => {
    if (props.leaf.bold) {
      return <strong {...props.attributes}>{props.children}</strong>;
    }
    return <span {...props.attributes}>{props.children}</span>;
  }, []);

  const onKeyDown = event => {
    if (!event.ctrlKey) {
      return;
    }

    switch (event.key) {
      case '`':
        event.preventDefault();
        const [match] = Editor.nodes(editor, {
          match: n => n.type === 'code',
        });
        Transforms.setNodes(
          editor,
          { type: match ? 'paragraph' : 'code' },
          { match: n => Editor.isBlock(editor, n) }
        );
        break;
      case 'b':
        event.preventDefault();
        Transforms.setNodes(
          editor,
          { bold: true },
          { match: n => Text.isText(n), split: true }
        );
        break;
      default:
        break;
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
}

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={value => setValue(value)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
}

export default IssueEditorPage;

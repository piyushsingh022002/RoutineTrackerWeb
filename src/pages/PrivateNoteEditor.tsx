import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import Button from '../components/common/Button';
import { useNotes } from '../context/NotesContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const TitleInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding: 0.75rem 0.75rem;
  color: var(--text-color);
  font-size: 1.4rem;
  font-weight: 800;
  width: 100%;
  outline: none;
  transition: border-color 120ms ease, box-shadow 120ms ease;
  &:focus {
    border-bottom-color: rgba(255,255,255,0.12);
    box-shadow: 0 6px 18px rgba(2,6,23,0.35) inset;
  }
`;

const EditorArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1.25rem;
  align-items: start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.03);
  padding: 1rem;
  border-radius: 10px;
  min-height: 220px;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.03);
  color: var(--text-light);
  margin: 6px 8px 6px 0;
  font-size: 0.9rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const PrivateNoteEditor: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagText, setTagText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const { createNote } = useNotes();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const addTag = () => {
    const t = tagText.trim();
    if (t && !tags.includes(t)) setTags((s) => [...s, t]);
    setTagText('');
  };

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return;
    setSaving(true);
    try {
      const created = await createNote({ title: title || 'Untitled', content, tags });
      // navigate to view note or dashboard
      navigate(`/notes/${created.id}`);
    } catch (err) {
      console.error('Create failed', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Wrapper>
      <Header>
        <TitleInput placeholder="Private note title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="outline" size="small" shape="pill" onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="primary" size="small" shape="pill" onClick={handleSave} isLoading={saving}>Save</Button>
        </div>
      </Header>

      <EditorArea>
        <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.03)' }}>
          <CodeMirror value={content} height="520px" extensions={[markdown()]} onChange={(v) => setContent(v)} />
        </div>
        <Sidebar>
          <div style={{ marginBottom: 12 }}>
            <strong style={{ color: 'var(--text-color)' }}>Tags</strong>
          </div>
          <div style={{ marginBottom: 8 }}>
            <input
              type="text"
              placeholder="add tag and press Enter"
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
              style={{ width: '100%', padding: '10px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', background: 'transparent', color: 'var(--text-color)' }}
            />
          </div>
          <div>
            {tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
          <div style={{ marginTop: 16 }}>
            <strong style={{ color: 'var(--text-color)' }}>Quick Actions</strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              <Button variant="outline" size="small" shape="pill" onClick={() => { setContent((c) => c + '\n\n- Daily Reflection:\n'); }}>Add Reflection</Button>
              <Button variant="outline" size="small" shape="pill" onClick={() => { setContent(''); setTitle(''); setTags([]); }}>Clear</Button>
            </div>
          </div>
        </Sidebar>
      </EditorArea>

      <Footer>
        <Button variant="outline" size="small" shape="pill" onClick={() => navigate('/private-notes')}>Back</Button>
        <Button variant="primary" size="small" shape="pill" onClick={handleSave} isLoading={saving}>Save Note</Button>
      </Footer>
    </Wrapper>
  );
};

export default PrivateNoteEditor;

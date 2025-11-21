import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATHS from '../routes/RoutePaths';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  background: linear-gradient(180deg, rgba(10,12,20,0.6), rgba(6,8,14,0.85));
  /* page-level text colors for this view */
  --text-color: #ffffff;
  --text-light: rgba(255,255,255,0.85);
`;

const Card = styled.div`
  width: min(980px, 96%);
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 14px;
  padding: 1.75rem;
  box-shadow: 0 18px 48px rgba(2,6,23,0.55);
  backdrop-filter: blur(8px) saturate(120%);
  transition: transform 180ms ease, box-shadow 180ms ease;
  &:hover { transform: translateY(-4px); box-shadow: 0 26px 60px rgba(2,6,23,0.6); }
`;

const Title = styled.h2`
  color: var(--text-color);
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
  font-weight: 700;
`;

const EditorArea = styled.div`
  margin-top: 0.75rem;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.03);
`;

const Toolbar = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px;
  background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005));
  border-bottom: 1px solid rgba(255,255,255,0.03);
`;

const ToolbarButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255,255,255,0.04);
  color: var(--text-light);
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  &:hover { background: rgba(255,255,255,0.02); }
`;

const LinedTextarea = styled.textarea`
  width: 100%;
  min-height: 56vh;
  max-height: 78vh;
  resize: vertical;
  padding: 1.25rem 1.5rem;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 28px,
    rgba(255,255,255,0.02) 29px
  );
  color: var(--text-color);
  border: none;
  outline: none;
  font-size: 1rem;
  line-height: 1.6;
  font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  background-color: rgba(255,255,255,0.01);
  caret-color: #ffffff;

  &::placeholder {
    color: rgba(255,255,255,0.7);
    opacity: 1;
  }

  &:focus {
    color: #ffffff;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const ActionButton = styled.button<{ primary?: boolean; danger?: boolean }>`
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.06);
  background: ${(p) => (p.primary ? 'linear-gradient(180deg,#3b82f6,#2563eb)' : p.danger ? 'linear-gradient(180deg,#ef4444,#dc2626)' : 'transparent')};
  color: ${(p) => (p.primary || p.danger ? 'white' : 'var(--text-color)')};
  cursor: pointer;
  font-weight: 600;
  transition: transform 120ms ease, opacity 120ms ease;
  &:active { transform: translateY(1px); }
`;

const CreatePrivateNote: React.FC = () => {
  const [content, setContent] = useState<string>(() => {
    try { return localStorage.getItem('private-note-content') || ''; } catch { return ''; }
  });
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const replaceSelection = (fn: (selected: string, full: string) => { newText: string; selectStart?: number; selectEnd?: number }) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const full = content;
    const selected = full.slice(start, end);
    const res = fn(selected, full);
    const newContent = full.slice(0, start) + res.newText + full.slice(end);
    setContent(newContent);
    // set caret/selection after update
    requestAnimationFrame(() => {
      const s = typeof res.selectStart === 'number' ? res.selectStart : start;
      const e = typeof res.selectEnd === 'number' ? res.selectEnd : (s + res.newText.length);
      el.focus();
      el.selectionStart = s;
      el.selectionEnd = e;
    });
  };

  const toggleWrap = (wrapLeft: string, wrapRight?: string) => {
    replaceSelection((selected) => {
      const right = wrapRight ?? wrapLeft;
      if (selected.startsWith(wrapLeft) && selected.endsWith(right)) {
        // unwrap
        const inner = selected.slice(wrapLeft.length, selected.length - right.length);
        return { newText: inner, selectStart: textareaRef.current!.selectionStart - wrapLeft.length, selectEnd: textareaRef.current!.selectionStart - wrapLeft.length + inner.length };
      }
      if (selected.length === 0) {
        const placeholder = '';
        const newText = `${wrapLeft}${placeholder}${right}`;
        return { newText, selectStart: textareaRef.current!.selectionStart + wrapLeft.length, selectEnd: textareaRef.current!.selectionStart + wrapLeft.length };
      }
      return { newText: `${wrapLeft}${selected}${right}`, selectStart: textareaRef.current!.selectionStart + wrapLeft.length, selectEnd: textareaRef.current!.selectionStart + wrapLeft.length + selected.length };
    });
  };

  const applyUpper = () => {
    replaceSelection((selected) => ({ newText: selected.toUpperCase() }));
  };

  const applyLower = () => {
    replaceSelection((selected) => ({ newText: selected.toLowerCase() }));
  };

  const applyHeading = () => {
    replaceSelection((selected, full) => {
      // apply to the whole current line(s)
      const el = textareaRef.current!;
      const start = full.lastIndexOf('\n', el.selectionStart - 1) + 1;
      const end = full.indexOf('\n', el.selectionEnd);
      const lineEnd = end === -1 ? full.length : end;
      const block = full.slice(start, lineEnd);
      const newBlock = block.split('\n').map(l => (l.startsWith('#') ? l : '# ' + l)).join('\n');
      return { newText: newBlock, selectStart: start, selectEnd: start + newBlock.length };
    });
  };

  const applyList = (ordered = false) => {
    replaceSelection((selected, full) => {
      const el = textareaRef.current!;
      const start = full.lastIndexOf('\n', el.selectionStart - 1) + 1;
      const end = full.indexOf('\n', el.selectionEnd);
      const lineEnd = end === -1 ? full.length : end;
      const block = full.slice(start, lineEnd);
      const lines = block.split('\n');
      const newLines = lines.map((l, i) => {
        if (ordered) return `${i + 1}. ${l.replace(/^\s*[-*+\d\.]+\s*/, '')}`;
        return `- ${l.replace(/^\s*[-*+\d\.]+\s*/, '')}`;
      });
      const newBlock = newLines.join('\n');
      return { newText: newBlock, selectStart: start, selectEnd: start + newBlock.length };
    });
  };

  const applyQuote = () => {
    replaceSelection((selected, full) => {
      const el = textareaRef.current!;
      const start = full.lastIndexOf('\n', el.selectionStart - 1) + 1;
      const end = full.indexOf('\n', el.selectionEnd);
      const lineEnd = end === -1 ? full.length : end;
      const block = full.slice(start, lineEnd);
      const newBlock = block.split('\n').map(l => `> ${l}`).join('\n');
      return { newText: newBlock, selectStart: start, selectEnd: start + newBlock.length };
    });
  };

  useEffect(() => {
    document.body.classList.add('semi-dark');
    return () => document.body.classList.remove('semi-dark');
  }, []);

  const navigate = useNavigate();

  const handleSave = useCallback(() => {
    try { localStorage.setItem('private-note-content', content); } catch { /* ignore */ }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigate(ROUTE_PATHS.PRIVATENOTES);
    }, 600);
  }, [content, navigate]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().includes('MAC');
      if ((isMac && e.metaKey && e.key === 's') || (!isMac && e.ctrlKey && e.key === 's')) {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handler as unknown as EventListener);
    return () => window.removeEventListener('keydown', handler as unknown as EventListener);
  }, [handleSave]);

  

  const handleDelete = () => {
    const ok = window.confirm('Delete this note? This cannot be undone.');
    if (!ok) return;
    setContent('');
    try { localStorage.removeItem('private-note-content'); } catch { /* ignore */ }
    textareaRef.current?.focus();
    navigate(ROUTE_PATHS.PRIVATENOTES);
  };

  return (
    <Wrapper>
      <Card>
        <Title>Private Note — Quiet Space</Title>
        <div style={{ color: 'var(--text-light)', marginBottom: 12 }}>A private, calm place to write your daily notes. Your notes are stored only for you.</div>

        <EditorArea>
          <Toolbar>
            <ToolbarButton title="Bold (Ctrl/Cmd+B)" onClick={() => toggleWrap('**')}><strong>B</strong></ToolbarButton>
            <ToolbarButton title="Italic (Ctrl/Cmd+I)" onClick={() => toggleWrap('*')}><em>I</em></ToolbarButton>
            <ToolbarButton title="Underline" onClick={() => toggleWrap('<u>', '</u>')}><span style={{textDecoration: 'underline'}}>U</span></ToolbarButton>
            <ToolbarButton title="Strikethrough" onClick={() => toggleWrap('~~')}><span style={{textDecoration: 'line-through'}}>S</span></ToolbarButton>
            <ToolbarButton title="Inline code" onClick={() => toggleWrap('`')}><code>{'{}'}</code></ToolbarButton>
            <ToolbarButton title="Heading" onClick={applyHeading}>H</ToolbarButton>
            <ToolbarButton title="Quote" onClick={applyQuote}>"</ToolbarButton>
            <ToolbarButton title="Bulleted list" onClick={() => applyList(false)}>• List</ToolbarButton>
            <ToolbarButton title="Numbered list" onClick={() => applyList(true)}>1. List</ToolbarButton>
            <ToolbarButton title="Uppercase" onClick={applyUpper}>Aa↑</ToolbarButton>
            <ToolbarButton title="Lowercase" onClick={applyLower}>aa↓</ToolbarButton>
          </Toolbar>

          <LinedTextarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your private note here..."
          />
        </EditorArea>

        <Actions>
          <ActionButton onClick={handleDelete} danger>
            Delete
          </ActionButton>
          <ActionButton onClick={handleSave} primary>
            {saved ? 'Saved' : 'Save'}
          </ActionButton>
        </Actions>
      </Card>
    </Wrapper>
  );
};

export default CreatePrivateNote;

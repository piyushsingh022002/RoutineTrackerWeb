import React, { useEffect } from 'react';
import styled from 'styled-components';
import PrivateNoteEditor from './PrivateNoteEditor';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  background: linear-gradient(180deg, rgba(10,12,20,0.6), rgba(6,8,14,0.85));
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

const CreatePrivateNote: React.FC = () => {
  useEffect(() => {
    document.body.classList.add('semi-dark');
    return () => document.body.classList.remove('semi-dark');
  }, []);

  return (
    <Wrapper>
      <Card>
        <Title>Private Note — Quiet Space</Title>
        <div style={{ color: 'var(--text-light)', marginBottom: 12 }}>A private, calm place to write your daily notes. Your notes are stored only for you.</div>
        {/* Custom private editor for a different, softer layout */}
        <PrivateNoteEditor />
      </Card>
    </Wrapper>
  );
};

export default CreatePrivateNote;

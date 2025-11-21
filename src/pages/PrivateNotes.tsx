import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import styled from 'styled-components';
import { useNotes } from '../context/NotesContext';
import NotesGrid from '../components/notes/NotesGrid';

const Page = styled.div`
  width: 100%;
  min-height: calc(100vh - var(--header-height, 72px));
  padding: 3rem 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  font-weight: 700;
  color: var(--text-color);
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: var(--text-light);
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const Card = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 8px 30px rgba(2,6,23,0.45);
`;

const PrivateNotes: React.FC = () => {
  const { notes, isLoading } = useNotes();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('semi-dark');
    return () => document.body.classList.remove('semi-dark');
  }, []);

  return (
    <Page className="container">
      <TopBar>
        <Heading>
          <Title>Private Notes</Title>
          <Subtitle>Daily private notes, visible only to you. Create, edit and reflect.</Subtitle>
        </Heading>

        <Actions>
          <Button variant="outline" size="small" shape="pill" onClick={() => navigate('/private-notes')}>All</Button>
          <Button variant="primary" size="small" shape="pill" onClick={() => navigate('/create-new-note')}>+ Create New Note</Button>
        </Actions>
      </TopBar>

      <Card>
        <NotesGrid notes={notes} isLoading={isLoading} emptyMessage="No private notes yet. Create daily notes to populate this space." />
      </Card>
    </Page>
  );
};

export default PrivateNotes;

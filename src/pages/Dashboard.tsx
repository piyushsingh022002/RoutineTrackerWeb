import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/common/Header';
import { device } from '../styles/breakpoints';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useState } from 'react';

function formatDate(dateStr:any) {
  return new Date(dateStr).toLocaleDateString();
}

const DashboardContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-color);
  transition: all 0.3s ease;
`;

const StatCard = styled.div`
  background: var(--bg-light);
  border-radius: var(--radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.2s;
`;

const StatTitle = styled.div`
  font-size: 1rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const NoteCard = styled(Link)`
  background: var(--bg-light);
  border-radius: var(--radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--text-color);
  transition: box-shadow 0.2s;
`;





// Dummy data and helpers for demonstration (replace with real data/hooks)






const Content = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  box-sizing: border-box;
  @media ${device.tablet} {
    padding: 1.25rem 0.5rem;
  }
  @media ${device.mobile} {
    padding: 0.5rem 0.25rem;
  }
`;


const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;


const WelcomeText = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;
`;

const UserName = styled.span`
  color: #60a5fa;
  font-family: 'Fira Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
  font-size: 1.5rem;
  font-weight: 700;
`;


const CreateNoteButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--radius);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--primary-hover);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;



const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;


const NoteDate = styled.div`
  font-size: 0.85rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
`;

const NoteTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const NoteContent = styled.p`
  font-size: 0.95rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

const NoteTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const NoteTag = styled.span`
  background: var(--primary-color);
  color: #fff;
  border-radius: 12px;
  padding: 0.15rem 0.75rem;
  font-size: 0.8rem;
`;

const EmptyNotes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  color: var(--text-light);
`;

const EmptyNotesIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const EmptyNotesText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const EmptyNotesSubtext = styled.div`
  font-size: 0.95rem;
  color: var(--text-light);
  margin-bottom: 1rem;
`;


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.18);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled(Card)`
  max-width: 420px;
  width: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(74,108,247,0.13);
  padding: 2rem 1.5rem;
  z-index: 2100;
  position: relative;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 12px;
  right: 18px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #4a6cf7;
  cursor: pointer;
`;

const Dashboard = () => {
  const { user } = useAuth();
  const { notes, isLoading } = useNotes();
  const [showAll, setShowAll] = useState(false);

  // Sort notes by createdAt descending
  const sortedNotes = [...(notes || [])].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const recentNotes = sortedNotes.slice(0, 2);
  const hasMoreThanTwo = sortedNotes.length > 2;

  return (
    <DashboardContainer>
      <Header />
      <Content>
        <DashboardHeader>
          <WelcomeText>
            Welcome, <UserName>{user?.name || 'User'}</UserName> !
          </WelcomeText>
          <CreateNoteButton to="/notes/new">
            <span>+</span> New Note
          </CreateNoteButton>
        </DashboardHeader>
        <StatsGrid>
          <StatCard>
            <StatTitle>Total Notes</StatTitle>
            <StatValue>{sortedNotes.length}</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>This Week</StatTitle>
            <StatValue>{0}</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Current Streak</StatTitle>
            <StatValue>{0} days</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Completion Rate</StatTitle>
            <StatValue>0%</StatValue>
          </StatCard>
        </StatsGrid>
        <h2 className="text-xl font-semibold mb-4">Recent Notes</h2>
        <NotesGrid>
          {isLoading ? (
            <EmptyNotes>Loading...</EmptyNotes>
          ) : recentNotes.length > 0 ? (
            recentNotes.map((note) => (
              <NoteCard
                key={note.id.toString()}
                to={`/notes/${note.id}`}
              >
                <NoteDate>{formatDate(note.createdAt)}</NoteDate>
                <NoteTitle>{note.title}</NoteTitle>
              </NoteCard>
            ))
          ) : (
            <EmptyNotes>
              <EmptyNotesIcon>
                📝
              </EmptyNotesIcon>
              <EmptyNotesText>No notes yet</EmptyNotesText>
              <EmptyNotesSubtext>
                Start tracking your daily activities by creating your first note.
              </EmptyNotesSubtext>
              <CreateNoteButton to="/notes/new">
                <span>+</span> Create Your First Note
              </CreateNoteButton>
            </EmptyNotes>
          )}
        </NotesGrid>
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Button
            variant="primary"
            size="medium"
            disabled={!hasMoreThanTwo}
            onClick={() => setShowAll(true)}
            style={{ minWidth: 180, opacity: hasMoreThanTwo ? 1 : 0.6 }}
          >
            View All Notes
          </Button>
        </div>
        {showAll && (
          <ModalOverlay>
            <ModalBox elevation="high" borderRadius="large" fullWidth>
              <ModalClose onClick={() => setShowAll(false)}>&times;</ModalClose>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#4a6cf7', marginBottom: 18 }}>All Notes</h3>
              {sortedNotes.length === 0 ? (
                <div style={{ color: '#888', textAlign: 'center' }}>No notes found.</div>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {sortedNotes.map((note) => (
                    <li key={note.id} style={{
                      padding: '0.7rem 0.5rem',
                      borderBottom: '1px solid #e5e7eb',
                      fontSize: 16,
                      color: '#222',
                      cursor: 'pointer',
                      transition: 'background 0.18s',
                    }}>
                      {note.title}
                    </li>
                  ))}
                </ul>
              )}
            </ModalBox>
          </ModalOverlay>
        )}
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard;

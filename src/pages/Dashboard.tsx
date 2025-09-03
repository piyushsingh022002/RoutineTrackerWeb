import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/common/Header';
import { device } from '../styles/breakpoints';

// Dummy data and helpers for demonstration (replace with real data/hooks)
const user = { username: 'User' };
const totalNotes = 10;
const thisWeekNotes = 5;
const streak = 3;
const sortedNotes = [
  { id: 1, createdAt: new Date(), title: 'Note 1', content: 'Content 1', tags: ['tag1', 'tag2'] },
  { id: 2, createdAt: new Date(), title: 'Note 2', content: 'Content 2', tags: ['tag3'] },
];
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString();
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

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Header />
      <Content>
        <DashboardHeader>
          <WelcomeText>Welcome back, {user?.username}!</WelcomeText>
          <CreateNoteButton to="/notes/new">
            <span>+</span> New Note
          </CreateNoteButton>
        </DashboardHeader>
        <StatsGrid>
          <StatCard>
            <StatTitle>Total Notes</StatTitle>
            <StatValue>{totalNotes}</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>This Week</StatTitle>
            <StatValue>{thisWeekNotes}</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Current Streak</StatTitle>
            <StatValue>{streak} days</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Completion Rate</StatTitle>
            <StatValue>{totalNotes > 0 ? Math.round((thisWeekNotes / 7) * 100) : 0}%</StatValue>
          </StatCard>
        </StatsGrid>
        <h2 className="text-xl font-semibold mb-4">Recent Notes</h2>
        <NotesGrid>
          {sortedNotes.length > 0 ? (
            sortedNotes.map((note) => (
              <NoteCard
                key={note.id.toString()}
                to={`/notes/${note.id}`}
              >
                <NoteDate>{formatDate(note.createdAt)}</NoteDate>
                <NoteTitle>{note.title}</NoteTitle>
                <NoteContent>{note.content}</NoteContent>
                {note.tags && note.tags.length > 0 && (
                  <NoteTags>
                    {note.tags.map((tag, index) => (
                      <NoteTag key={index}>{tag}</NoteTag>
                    ))}
                  </NoteTags>
                )}
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
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard;

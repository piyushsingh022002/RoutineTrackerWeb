import { Link, NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Header from '../components/common/Header';
import { device } from '../styles/breakpoints';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useState } from 'react';
import { ActivityCalendar } from '../components/dashboard';
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
import { motion } from 'framer-motion';

function formatDate(dateStr:any) {
  return new Date(dateStr).toLocaleDateString();
}

const DashboardContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: transparent; /* allow background cursor to show */
  transition: all 0.3s ease;
  /* Offset for fixed header */
  padding-top: 88px;
  @media ${device.tablet} { padding-top: 72px; }
  @media ${device.mobile} { padding-top: 64px; }
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

const NotesGrid = styled(motion.div)`
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

// Animated "Create Note" hero tile
const CreateTile = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  border-radius: 16px;
  color: #fff;
  text-decoration: none;
  overflow: hidden;
  min-height: 200px;
  box-shadow: 0 10px 30px rgba(74,108,247,0.25);
  border: 1px solid rgba(255,255,255,0.15);
  background: linear-gradient(120deg, #4a6cf7 0%, #22d3ee 50%, #a78bfa 100%);
  background-size: 200% 200%;
  animation: auroraShift 8s ease infinite;
  isolation: isolate;

  &:after {
    content: '';
    position: absolute;
    inset: -20%;
    background: radial-gradient(60% 60% at 20% 10%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%),
                radial-gradient(40% 40% at 80% 90%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%);
    pointer-events: none;
    mix-blend-mode: soft-light;
  }

  &:hover {
    box-shadow: 0 16px 44px rgba(74,108,247,0.35);
  }

  @keyframes auroraShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const TileTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Spark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: rgba(255,255,255,0.2);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.35), 0 4px 10px rgba(0,0,0,0.15);
  font-size: 16px;
`;

const TileTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.2px;
  text-shadow: 0 1px 0 rgba(0,0,0,0.18);
`;

const TileBody = styled.div`
  margin-top: 0.5rem;
  color: rgba(255,255,255,0.95);
  font-size: 0.95rem;
`;

const TilePoints = styled.ul`
  margin: 0.75rem 0 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.25rem;
  color: rgba(255,255,255,0.92);
  li { list-style: '✨  '; }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

const TileCTA = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  position: relative;
  color: #fff;
  background: linear-gradient(90deg, #4a6cf7, #22d3ee, #a78bfa, #4a6cf7);
  background-size: 300% 100%;
  animation: ${gradientFlow} 6s linear infinite;
  border: 1px solid rgba(255,255,255,0.35);
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.2px;
  backdrop-filter: blur(6px);
  transition: transform 0.2s ease, background 0.2s ease;
  overflow: hidden;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background-position: 0 0;
  }

  .plus {
    width: 24px;
    height: 24px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    color: #4a6cf7;
    font-weight: 800;
    box-shadow: 0 4px 10px rgba(0,0,0,0.12);
  }

  &:hover { transform: translateY(-2px); background: rgba(255,255,255,0.24); }
`;





// Dummy data and helpers for demonstration (replace with real data/hooks)






const Content = styled.main`
  width: 90%;
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

// Layout: Sidebar | Main | Calendar
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr 360px;
  gap: 1rem;
  align-items: start;
  @media ${device.tablet} {
    grid-template-columns: 200px 1fr;
    grid-auto-rows: min-content;
    grid-template-areas:
      'sidebar main'
      'sidebar main'
      'sidebar calendar';
  }
  @media ${device.mobile} {
    display: block;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 100px; /* below header */
  align-self: start;
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0.75rem;
  margin-top: 0.75rem; /* request: some margin at top left */
`;

const SidebarSectionTitle = styled.div`
  font-size: 0.8rem;
  color: var(--text-light);
  margin: 0.25rem 0 0.5rem;
  padding: 0 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  color: var(--text-color);
  text-decoration: none;
  &.active { background: rgba(74,108,247,0.1); color: #4a6cf7; text-decoration: underline; }
  &:hover { background: rgba(0,0,0,0.04); }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 0.5rem 0;
`;

const CalendarWrapper = styled.div`
  position: sticky;
  top: 100px; /* below header */
  align-self: start;
  margin-top: 0.75rem; /* request: some margin at top right */
`;


const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;


const WelcomeText = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: 0.2px;
  margin: 0;
  font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;
`;



const WelcomeWrap = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const GradientName = styled.span`
  background: linear-gradient(90deg, #60a5fa, #34d399 45%, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const wave = keyframes`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
`;

const Wave = styled.span`
  display: inline-block;
  margin-left: 6px;
  transform-origin: 70% 70%;
  animation: ${wave} 1.6s ease 300ms 1;
`;

const SubHeading = styled.div`
  font-size: 0.95rem;
  color: var(--text-light);
`;


const CreateNoteButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: 9999px;
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

// const NoteContent = styled.p`
//   font-size: 0.95rem;
//   color: var(--text-color);
//   margin-bottom: 0.5rem;
// `;

// const NoteTags = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
// `;

// const NoteTag = styled.span`
//   background: var(--primary-color);
//   color: #fff;
//   border-radius: 12px;
//   padding: 0.15rem 0.75rem;
//   font-size: 0.8rem;
// `;

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
  const gridVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  } as const;
  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 360, damping: 26 } },
  } as const;

  // Build activity logs for the current month
  const month = new Date();
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const noteDays = new Set((notes || []).map(n => format(new Date(n.createdAt), 'yyyy-MM-dd')));
  const activityLogs = days.map((d, idx) => ({
    id: idx + 1,
    userId: user?.id || 0,
    date: d.toISOString(),
    hasNote: noteDays.has(format(d, 'yyyy-MM-dd')),
    streakCount: 0,
  }));

  // Sort notes by createdAt descending
  const sortedNotes = [...(notes || [])].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const recentNotes = sortedNotes.slice(0, 2);
  const hasMoreThanTwo = sortedNotes.length > 2;

  return (
    <DashboardContainer>
      <Header />
      <Content>
        <MainGrid>
          <Sidebar>
            <SidebarSectionTitle>Create</SidebarSectionTitle>
            <SidebarLink to="/notes/new">➕ New Note</SidebarLink>
            <SidebarLink to="/noteplus">🤖 ChatGPT</SidebarLink>
            <SidebarSectionTitle>Collaboration</SidebarSectionTitle>
            <SidebarLink to="/teams">👥 Teams</SidebarLink>
            <Divider />
            <SidebarSectionTitle>Browse</SidebarSectionTitle>
            <SidebarLink to="/notes?filter=favorite">⭐ Favourite Notes</SidebarLink>
            <SidebarLink to="/notes?filter=important">❗ Important Notes</SidebarLink>
            <SidebarLink to="/notes">🗂️ All Notes</SidebarLink>
            <SidebarLink to="/notes?filter=deleted">🗑️ Deleted Notes</SidebarLink>
          </Sidebar>

          {/* Main center content */}
          <div>
            <DashboardHeader>
              <WelcomeWrap
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <WelcomeText>
                  {(() => {
                    const hour = new Date().getHours();
                    const greeting = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
                    const firstName = (user?.name || 'Explorer').split(' ')[0];
                    return (
                      <>
                        Good {greeting}, <GradientName>{firstName}</GradientName>
                        <Wave>👋</Wave>
                      </>
                    );
                  })()}
                </WelcomeText>
                <SubHeading>
                  {(() => {
                    const count = (notes || []).length;
                    if (count === 0) return 'Start your first note and kick off a winning streak.';
                    if (count < 5) return 'You’re off to a strong start — keep the momentum!';
                    return 'Welcome back — ready to capture today’s highlights?';
                  })()}
                </SubHeading>
              </WelcomeWrap>
              <CreateNoteButton to="/notes/new">
                <span>+</span> New Note
              </CreateNoteButton>
            </DashboardHeader>
            <h2 className="text-xl font-semibold mb-4">Recent Notes</h2>
            {isLoading ? (
              <EmptyNotes>Loading...</EmptyNotes>
            ) : (
              <NotesGrid variants={gridVariants} initial="hidden" animate="show">
                <motion.div variants={itemVariants} whileHover={{ y: -4, rotate: -0.2 }} whileTap={{ scale: 0.98 }}>
                  <CreateTile to="/notes/new" aria-label="Create a new note">
                    <TileTop>
                      <Spark>🌟</Spark>
                      <TileTitle>Capture a thought</TileTitle>
                    </TileTop>
                    <TileBody>
                      Turn ideas into progress. Log habits, wins, and learnings in seconds.
                      <TilePoints>
                        <li>Super-fast editor</li>
                        <li>Tags & media support</li>
                        <li>Streak-ready tracking</li>
                      </TilePoints>
                    </TileBody>
                    <TileCTA>
                      <span className="plus">+</span> Create Note
                    </TileCTA>
                  </CreateTile>
                </motion.div>

                {recentNotes.map((note) => (
                  <motion.div
                    key={note.id.toString()}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NoteCard to={`/notes/${note.id}`}>
                      <NoteDate>{formatDate(note.createdAt)}</NoteDate>
                      <NoteTitle>{note.title}</NoteTitle>
                    </NoteCard>
                  </motion.div>
                ))}
              </NotesGrid>
            )}
            {(!isLoading && recentNotes.length === 0) && (
              <EmptyNotes>
                <EmptyNotesIcon>📝</EmptyNotesIcon>
                <EmptyNotesText>No notes yet</EmptyNotesText>
                <EmptyNotesSubtext>
                  Your first note starts your streak. Click the tile above to begin.
                </EmptyNotesSubtext>
              </EmptyNotes>
            )}
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
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Button
                variant="primary"
                size="medium"
                shape="pill"
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
          </div>

          {/* Right calendar */}
          <CalendarWrapper>
            <ActivityCalendar activityLogs={activityLogs} month={month} />
          </CalendarWrapper>
        </MainGrid>
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard;

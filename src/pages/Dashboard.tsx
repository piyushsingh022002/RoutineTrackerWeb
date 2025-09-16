import Header from '../components/common/Header';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import Button from '../components/common/Button';
import { useState } from 'react';
import { ActivityCalendar } from '../components/dashboard';
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
import { motion } from 'framer-motion';
import type { Note } from '../types';

import {
  DashboardContainer,
  StatCard,
  StatTitle,
  StatValue,
  NotesGrid,
  NoteCard,
  CreateTile,
  TileTop,
  Spark,
  TileTitle,
  TileBody,
  TilePoints,
  TileCTA,
  Content,
  MainGrid,
  Sidebar,
  SidebarSectionTitle,
  SidebarLink,
  Divider,
  CalendarWrapper,
  DashboardHeader,
  WelcomeText,
  WelcomeWrap,
  GradientName,
  Wave,
  SubHeading,
  CreateNoteButton,
  StatsGrid,
  NoteDate,
  NoteTitle,
  EmptyNotes,
  EmptyNotesIcon,
  EmptyNotesText,
  EmptyNotesSubtext,
  ModalOverlay,
  ModalBox,
  ModalClose,
} from './Dashboard.styles';

function formatDate(dateStr: string | number | Date | undefined) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString();
}

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
  const noteDays = new Set((notes || []).map((n: Note) => format(new Date(n.createdAt), 'yyyy-MM-dd')));
  const activityLogs = days.map((d, idx) => ({
    id: idx + 1,
    userId: user?.id || 0,
    date: d.toISOString(),
    hasNote: noteDays.has(format(d, 'yyyy-MM-dd')),
    streakCount: 0,
  }));

  // Sort notes by createdAt descending
  const sortedNotes = [...(notes || [])].sort((a: Note, b: Note) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
          <div style={{ width: '100%' }}>
            {/* 1. Greeting and subheading */}
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

            {/* 2. NotesGrid (full width, single row: create tile + 2 recent notes) */}
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
            </NotesGrid>
            {isLoading && (
              <EmptyNotes>Loading...</EmptyNotes>
            )}
            <h2 className="text-xl font-semibold mb-4" style={{marginTop: '2.5rem'}}>Recent Notes</h2>
            {/* Show recent notes cards below heading */}
            {!isLoading && recentNotes.length > 0 && (
              <NotesGrid variants={gridVariants} initial="hidden" animate="show">
                {recentNotes.map((note: Note) => (
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
            {!isLoading && recentNotes.length === 0 && (
              <EmptyNotes>
                <EmptyNotesIcon>📝</EmptyNotesIcon>
                <EmptyNotesText>No recent notes</EmptyNotesText>
                <EmptyNotesSubtext>
                  Your first note starts your streak. Click the tile above to begin.
                </EmptyNotesSubtext>
              </EmptyNotes>
            )}

            {/* 3. View All Notes Button (centered, only if more than two notes) */}
            {hasMoreThanTwo && (
              <div style={{ margin: '2rem 0 0 0', textAlign: 'center' }}>
                <Button
                  variant="primary"
                  size="medium"
                  shape="pill"
                  onClick={() => setShowAll(true)}
                  style={{ minWidth: 180 }}
                >
                  View All Notes
                </Button>
              </div>
            )}

            {/* 4. StatsGrid (full width, below button) */}
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

            {/* 5. Show all notes modal/list if requested */}
            {showAll && (
              <ModalOverlay>
                <ModalBox elevation="high" borderRadius="large" fullWidth>
                  <ModalClose onClick={() => setShowAll(false)}>&times;</ModalClose>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#4a6cf7', marginBottom: 18 }}>All Notes</h3>
                  {sortedNotes.length === 0 ? (
                    <div style={{ color: '#888', textAlign: 'center' }}>No notes found.</div>
                  ) : (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {sortedNotes.map((note: Note) => (
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



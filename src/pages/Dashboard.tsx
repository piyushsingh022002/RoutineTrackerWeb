import Header from '../components/common/Header';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import Button from '../components/common/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ActivityCalendar } from '../components/dashboard';
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
import { motion } from 'framer-motion';
import type { Note } from '../types';

import {
  DashboardContainer,
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
import ViewModal from '../components/Modal/ViewModal';
// import Loader from '../components/common/Loader';
import DashboardSidebar from '../components/layout/DashboardSidebar';
import StatsCard from '../components/layout/StatsCard';

function formatDate(dateStr: string | number | Date | undefined) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString();
}

const Dashboard = () => {
  const { user } = useAuth();
  const { notes, isLoading, clearCurrentNote } = useNotes();
  const [openNote, setOpenNote] = useState<Note | null>(null);
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  // collapse by default per request
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [calendarCollapsed, setCalendarCollapsed] = useState(true);
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
    <>
    <Header />
    <DashboardContainer>
      <Content>
        <MainGrid collapsed={sidebarCollapsed} rightCollapsed={calendarCollapsed}>
          <DashboardSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((s) => !s)} />
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
              <EmptyNotes><Loader text="Loading notes..." /></EmptyNotes>
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
                    style={{ position: 'relative' }}
                  >
                    <NoteCard to="#" tabIndex={0} style={{ pointerEvents: 'auto' }}>
                      <NoteDate>{formatDate(note.createdAt)}</NoteDate>
                      <NoteTitle>{note.title}</NoteTitle>
                      {/* Overlay button for accessibility and click */}
                      <button
                        type="button"
                        aria-label={`Open note: ${note.title}`}
                        onClick={() => setOpenNote(note)}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          zIndex: 2,
                          // transition: 'border 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.border = '1px solid black')}
                        onMouseLeave={(e) => (e.currentTarget.style.border = 'none')}
                      />
                    </NoteCard>
                  </motion.div>
                ))}
              </NotesGrid>
            )}
            
            {/* Note dialog for recent note */}
            {openNote && (
              <ViewModal
                open={!!openNote}
                note={openNote}
                onClose={() => setOpenNote(null)}
                onBack={() => {
                  // reopen the full notes dialog and close the single-note view
                  setShowAll(true);
                  setOpenNote(null);
                }}
                onEdit={(n) => {
                  clearCurrentNote();
                  navigate(`/notes/${n?.id}/edit`, { state: { note: n } });
                }}
              />
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
              <StatsCard title="Total Notes" value={sortedNotes.length} />
              <StatsCard title="This Week" value={0} />
              <StatsCard title="Current Streak" value={`${0} days`} />
              <StatsCard title="Completion Rate" value={`0%`} />
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
                        <li
                          key={note.id}
                          onClick={() => { setOpenNote(note); setShowAll(false); }}
                          style={{
                            padding: '0.7rem 0.5rem',
                            borderBottom: '1px solid #e5e7eb',
                            fontSize: 16,
                            color: '#222',
                            cursor: 'pointer',
                            transition: 'background 0.18s',
                          }}
                        >
                          {note.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </ModalBox>
              </ModalOverlay>
            )}
          </div>

          {/* Right calendar (collapsible) */}
          <CalendarWrapper>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
              <button
                onClick={() => setCalendarCollapsed((s) => !s)}
                aria-label={calendarCollapsed ? 'Expand calendar' : 'Collapse calendar'}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: 6,
                  borderRadius: 8,
                  color: 'var(--text-color)'
                }}
              >
                {calendarCollapsed ? <FaChevronLeft /> : <FaChevronRight />}
              </button>
            </div>

            {!calendarCollapsed ? (
              <ActivityCalendar activityLogs={activityLogs} month={month} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 120 }}>
                <div style={{ color: 'var(--text-light)', fontSize: 12 }}>Calendar collapsed</div>
              </div>
            )}
          </CalendarWrapper>
        </MainGrid>
      </Content>
    </DashboardContainer>
    </>
  );
};

export default Dashboard;



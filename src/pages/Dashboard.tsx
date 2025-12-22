import Header from '../components/common/Header';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ActivityCalendar } from '../components/dashboard';
import { eachDayOfInterval, endOfMonth, format, formatDistanceToNow, startOfMonth, subDays } from 'date-fns';
import type { Note } from '../types';

import {
  DashboardContainer,
  HeroGrid,
  HeroLeftStack,
  CreateTile,
  HeroTileWrapper,
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
  EmptyNotes,
  EmptyNotesIcon,
  EmptyNotesText,
  EmptyNotesSubtext,
  MomentumCard,
  MomentumBadge,
  MomentumMeta,
  MetricValue,
  MetricLabel,
  MetricDelta,
  MomentumSparkline,
  ProgressTrack,
  ProgressFill,
  QuickInsights,
  InsightCard,
  InsightIcon,
  InsightCopy,
  InsightLabel,
  InsightValue,
  GoalRow,
  GoalChip,
  ModalOverlay,
  ModalBox,
  ModalClose,
  TimelineCard,
  TimelineHeader,
  TimelineAction,
  TimelineList,
  TimelineItem,
  TimelineBullet,
  TimelineContent,
  TimelineTime,
} from '../pages.styles/Dashboard.styles';
import ViewModal from '../components/Modal/ViewModal';
// import Loader from '../components/common/Loader';
import DashboardSidebar from '../components/layout/DashboardSidebar';
import StatsCard from '../components/layout/StatsCard';

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
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const noteDays = new Set((notes || []).map((n: Note) => format(new Date(n.createdAt), 'yyyy-MM-dd')));
  const activityLogs = days.map((d, idx) => ({
    id: idx + 1,
    userId: user?.id || 0,
    date: d.toISOString(),
    hasNote: noteDays.has(format(d, 'yyyy-MM-dd')),
    streakCount: 0,
  }));
  const sortedNotes = [...(notes || [])].sort((a: Note, b: Note) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const totalNotes = sortedNotes.length;
  const noteDateSet = new Set(sortedNotes.map((note: Note) => format(new Date(note.createdAt), 'yyyy-MM-dd')));
  const weeklyWindowStart = subDays(today, 6);
  const weeklyNotes = sortedNotes.filter((note: Note) => new Date(note.createdAt) >= weeklyWindowStart).length;
  const weeklyTarget = 5;
  const weeklyProgress = weeklyTarget ? Math.min(100, Math.round((weeklyNotes / weeklyTarget) * 100)) : 0;
  const previousWeekWindowStart = subDays(weeklyWindowStart, 7);
  const previousWeekWindowEnd = subDays(weeklyWindowStart, 1);
  const previousWeekNotes = sortedNotes.filter((note: Note) => {
    const created = new Date(note.createdAt);
    return created >= previousWeekWindowStart && created <= previousWeekWindowEnd;
  }).length;
  const weekOverWeek = weeklyNotes - previousWeekNotes;
  const streakCount = (() => {
    let streak = 0;
    let cursor = new Date();
    while (noteDateSet.has(format(cursor, 'yyyy-MM-dd'))) {
      streak += 1;
      cursor = subDays(cursor, 1);
    }
    return streak;
  })();
  const totalWords = sortedNotes.reduce((acc, curr) => {
    const text = (curr.content || '').trim();
    if (!text) return acc;
    return acc + text.split(/\s+/).filter(Boolean).length;
  }, 0);
  const averageWords = totalNotes ? Math.max(1, Math.round(totalWords / Math.max(1, totalNotes))) : 0;
  const tagCounts = sortedNotes.reduce<Map<string, number>>((acc, note) => {
    (note.tags || []).forEach((tag) => {
      const lowered = tag.toLowerCase();
      acc.set(lowered, (acc.get(lowered) || 0) + 1);
    });
    return acc;
  }, new Map<string, number>());
  const topTags = tagCounts.size
    ? Array.from(tagCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([tag]) => `#${tag}`)
        .join(' ')
    : 'Add tags for insights';
  const lastNote = sortedNotes[0];
  const daysElapsedThisWeek = ((today.getDay() + 6) % 7) + 1;
  const paceBaseline = weeklyTarget ? weeklyTarget / 7 : 0;
  const pacePercent = paceBaseline
    ? Math.min(160, Math.round(((weeklyNotes / Math.max(daysElapsedThisWeek, 1)) / paceBaseline) * 100))
    : 0;
  const paceState = weeklyNotes === 0 ? 'fresh' : pacePercent >= 110 ? 'ahead' : pacePercent >= 85 ? 'steady' : 'behind';
  const paceBadgeCopy = weeklyNotes === 0 ? 'Fresh start' : pacePercent >= 110 ? 'Ahead of pace' : pacePercent >= 85 ? 'On track' : 'Needs focus';
  const targetRemaining = Math.max(weeklyTarget - weeklyNotes, 0);
  const targetCopy =
    targetRemaining === 0 ? 'Weekly target met — go for extra credit' : `${targetRemaining} note${targetRemaining === 1 ? '' : 's'} to goal`;
  const weeklyNotesLabel = weeklyNotes ? `${weeklyNotes} logged this week` : 'Blank slate week';
  const sparklineWidth = weeklyProgress ? Math.min(100, Math.max(12, weeklyProgress)) : 12;
  const lastCaptureDistance = lastNote ? formatDistanceToNow(new Date(lastNote.createdAt), { addSuffix: true }) : 'Never';
  const insightsData = [
    {
      id: 'active-days',
      icon: '📆',
      label: 'Active days',
      value: noteDateSet.size ? `${noteDateSet.size} day${noteDateSet.size === 1 ? '' : 's'}` : 'Start today',
    },
    {
      id: 'avg-length',
      icon: '✍️',
      label: 'Avg note length',
      value: averageWords ? `${averageWords} words` : 'Add notes',
    },
    {
      id: 'top-tags',
      icon: '🏷️',
      label: 'Top tags',
      value: topTags,
    },
    {
      id: 'last-note',
      icon: '🕒',
      label: 'Last captured',
      value: lastNote ? `${format(new Date(lastNote.createdAt), 'MMM d • h:mma')} (${lastCaptureDistance})` : 'Not yet',
    },
  ];
  const timelineEntries = sortedNotes.slice(0, 4).map((note) => {
    const rawPreview = (note.content || '').replace(/\s+/g, ' ').trim();
    const preview = rawPreview.length > 90 ? `${rawPreview.slice(0, 90)}…` : rawPreview || 'Freshly created';
    return {
      id: note.id,
      title: note.title || 'Untitled note',
      preview,
      timestamp: format(new Date(note.createdAt), 'MMM d • h:mma'),
    };
  });
  const motivationCopy = streakCount
    ? `Keep the ${streakCount}-day streak alive.`
    : 'Log a quick win to ignite your streak.';

  return (
    <>
    <Header />
    <DashboardContainer>
      <Content>
        <MainGrid $collapsed={sidebarCollapsed} $rightCollapsed={calendarCollapsed}>
          <DashboardSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((s) => !s)} />
          {/* Main center content */}
          <div style={{ width: '100%' }}>
            <HeroGrid variants={gridVariants} initial="hidden" animate="show">
              <HeroLeftStack variants={itemVariants}>
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
                <HeroTileWrapper
                  variants={itemVariants}
                  whileHover={{ y: -4, rotate: -0.2 }}
                  whileTap={{ scale: 0.98 }}
                >
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
                </HeroTileWrapper>
              </HeroLeftStack>

              <MomentumCard
                data-tone={paceState}
                variants={itemVariants}
                whileHover={{ y: -4, rotate: 0.15 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="eyebrow">Momentum</span>
                  <MomentumBadge data-tone={paceState}>{paceBadgeCopy}</MomentumBadge>
                </div>
                <h3>{streakCount ? `Streak: ${streakCount} day${streakCount === 1 ? '' : 's'}` : 'Let’s build your streak'}</h3>
                <p>{motivationCopy}</p>
                <MomentumSparkline>
                  <span className="sparkline__pulse" style={{ width: `${sparklineWidth}%` }} />
                </MomentumSparkline>
                <ProgressTrack>
                  <ProgressFill style={{ width: `${weeklyProgress}%` }} />
                </ProgressTrack>
                <small>{targetCopy}</small>
                <MomentumMeta>
                  <div>
                    <MetricLabel>This week</MetricLabel>
                    <MetricValue>{weeklyNotes}/{weeklyTarget}</MetricValue>
                    <MetricDelta data-positive={weekOverWeek >= 0}>{weekOverWeek >= 0 ? `+${weekOverWeek}` : `${weekOverWeek}`} vs last wk</MetricDelta>
                  </div>
                  <div>
                    <MetricLabel>Total notes</MetricLabel>
                    <MetricValue>{totalNotes}</MetricValue>
                    <MetricDelta>{lastNote ? `Last ${lastCaptureDistance}` : 'No entries yet'}</MetricDelta>
                  </div>
                  <div>
                    <MetricLabel>Pace</MetricLabel>
                    <MetricValue>{pacePercent ? `${pacePercent}%` : '—'}</MetricValue>
                    <MetricDelta data-positive={pacePercent >= 100}>{paceBadgeCopy}</MetricDelta>
                  </div>
                </MomentumMeta>
                <GoalRow>
                  <GoalChip>{weeklyNotesLabel}</GoalChip>
                  <GoalChip>{paceBadgeCopy}</GoalChip>
                  <GoalChip>{lastNote ? `Last note ${lastCaptureDistance}` : 'Capture something new'}</GoalChip>
                </GoalRow>
              </MomentumCard>
            </HeroGrid>

            <QuickInsights>
              {insightsData.map((insight) => (
                <InsightCard
                  key={insight.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -3 }}
                >
                  <InsightIcon>{insight.icon}</InsightIcon>
                  <InsightCopy>
                    <InsightLabel>{insight.label}</InsightLabel>
                    <InsightValue>{insight.value}</InsightValue>
                  </InsightCopy>
                </InsightCard>
              ))}
            </QuickInsights>
            {isLoading && (
              <EmptyNotes><Loader text="Loading notes..." /></EmptyNotes>
            )}

            {openNote && (
              <ViewModal
                open={!!openNote}
                note={openNote}
                onClose={() => setOpenNote(null)}
                onBack={() => {
                  setShowAll(true);
                  setOpenNote(null);
                }}
                onEdit={(n) => {
                  clearCurrentNote();
                  navigate(`/notes/${n?.id}/edit`, { state: { note: n } });
                }}
              />
            )}

            {/* 4. StatsGrid (full width, below button) */}
            <StatsGrid>
              <StatsCard title="Total Notes" value={totalNotes} />
              <StatsCard title="This Week" value={`${weeklyNotes}/${weeklyTarget}`} />
              <StatsCard title="Current Streak" value={`${streakCount || 0} day${streakCount === 1 ? '' : 's'}`} />
              <StatsCard title="Weekly Goal" value={`${weeklyProgress}%`} />
            </StatsGrid>

            <TimelineCard
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TimelineHeader>
                <div>
                  <span className="eyebrow">Latest captures</span>
                  <h3>Activity feed</h3>
                </div>
                <TimelineAction onClick={() => setShowAll(true)}>View log</TimelineAction>
              </TimelineHeader>
              {timelineEntries.length > 0 ? (
                <TimelineList>
                  {timelineEntries.map((entry) => (
                    <TimelineItem key={entry.id.toString()}>
                      <TimelineBullet />
                      <TimelineContent>
                        <span className="title">{entry.title}</span>
                        <span className="preview">{entry.preview}</span>
                      </TimelineContent>
                      <TimelineTime>{entry.timestamp}</TimelineTime>
                    </TimelineItem>
                  ))}
                </TimelineList>
              ) : (
                <EmptyNotes>
                  <EmptyNotesIcon>🚀</EmptyNotesIcon>
                  <EmptyNotesText>Capture your first note</EmptyNotesText>
                  <EmptyNotesSubtext>Entries show up here once you start writing.</EmptyNotesSubtext>
                </EmptyNotes>
              )}
            </TimelineCard>

            {/* 5. Show all notes modal/list if requested */}
            {showAll && (
              <ModalOverlay>
                <ModalBox elevation="high" borderRadius="large" fullWidth>
                  <ModalClose onClick={() => setShowAll(false)}>&times;</ModalClose>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: 18 }}>All Notes</h3>
                  {sortedNotes.length === 0 ? (
                    <div style={{ color: 'var(--text-light)', textAlign: 'center' }}>No notes found.</div>
                  ) : (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {sortedNotes.map((note: Note) => (
                        <li
                          key={note.id}
                          onClick={() => { setOpenNote(note); setShowAll(false); }}
                          style={{
                            padding: '0.7rem 0.5rem',
                            borderBottom: '1px solid var(--border-color)',
                            fontSize: 16,
                            color: 'var(--text-color)',
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
              <ActivityCalendar activityLogs={activityLogs} month={today} />
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



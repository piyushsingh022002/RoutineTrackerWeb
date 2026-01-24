import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';
import Card from '../components/common/Card';
import { device } from '../styles/breakpoints';

export const DashboardContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background:
    radial-gradient(ellipse 110% 80% at 20% 0%, var(--dashboard-overlay-2) 0%, transparent 60%),
    radial-gradient(ellipse 90% 70% at 80% 0%, var(--dashboard-overlay-3) 0%, transparent 65%),
    linear-gradient(120deg, var(--dashboard-base-start) 0%, var(--dashboard-base-end) 100%);
  background-attachment: fixed;
  overflow: hidden;
  transition: all 0.3s ease;
  /* Offset for fixed header */
  padding-top: 88px;
  position: relative;
  @media ${device.tablet} { padding-top: 72px; }
  @media ${device.mobile} { padding-top: 64px; }

  /* Animated background dots */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 15% 25%, var(--dashboard-overlay-1) 0%, transparent 55%),
      radial-gradient(circle at 75% 20%, var(--dashboard-overlay-2) 0%, transparent 60%),
      radial-gradient(circle at 50% 70%, var(--dashboard-overlay-3) 0%, transparent 65%);
    background-size: 200% 200%;
    opacity: 0.7;
    animation: dashboardBgMove 24s linear infinite alternate;
  }

  @keyframes dashboardBgMove {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 100%; }
  }
`;

export const StatCard = styled.div`
  background: var(--bg-light);
  border-radius: var(--radius);
  border: 1px solid var(--card-border-strong);
  box-shadow: var(--shadow);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
`;

export const StatTitle = styled.div`
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 0.5rem;
  
  .dark & {
    color: #94a3b8;
  }
`;

export const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
`;

export const NotesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  width: 100%;
  margin: 0;
`;

export const NoteCard = styled(Link)`
  background: var(--bg-light);
  border-radius: 2rem;
  border: 1px solid var(--card-border-strong);
  box-shadow: var(--shadow);
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #0f172a;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  .dark & {
    color: #e2e8f0;
  }

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
`;

export const HeroGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  margin: 1rem 0 2rem;
  grid-auto-rows: 1fr;
  align-items: stretch;
  align-content: stretch;
`;

export const HeroLeftStack = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

const sparkPulse = keyframes`
  0% { opacity: 0.45; transform: translateX(-10%); }
  50% { opacity: 1; transform: translateX(10%); }
  100% { opacity: 0.45; transform: translateX(40%); }
`;

export const MomentumCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background:
    radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.15), transparent 60%),
    radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.08), transparent 65%),
    linear-gradient(120deg, var(--dashboard-overlay-1), var(--dashboard-overlay-3));
  border: 1px solid var(--dashboard-hero-border);
  box-shadow: var(--dashboard-hero-shadow);
  color: var(--dashboard-hero-text);
  isolation: isolate;

  &:after {
    content: '';
    position: absolute;
    inset: 12%;
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent 75%);
    mix-blend-mode: screen;
    z-index: -1;
  }

  .eyebrow {
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    opacity: 0.85;
    color: #0f172a;
  }
  
  .dark & .eyebrow {
    color: rgba(255, 255, 255, 0.9);
  }

  h3 {
    margin: 0.35rem 0 0.2rem;
    font-size: 1.35rem;
    font-weight: 700;
    color: #0f172a;
  }
  
  .dark & h3 {
    color: #ffffff;
  }

  p {
    margin: 0 0 1rem;
    color: #1f2937;
  }
  
  .dark & p {
    color: rgba(255, 255, 255, 0.9);
  }

  small {
    display: inline-block;
    font-weight: 600;
    color: #374151;
  }
  
  .dark & small {
    color: rgba(255, 255, 255, 0.85);
  }
`;

export const MomentumBadge = styled.span`
  padding: 0.2rem 0.85rem;
  border-radius: 999px;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: 1px solid rgba(15, 23, 42, 0.2);
  background: rgba(15, 23, 42, 0.1);
  color: #0f172a;
  white-space: nowrap;

  .dark & {
    border: 1px solid rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.14);
    color: var(--dashboard-hero-text);
  }

  &[data-tone='ahead'] {
    background: rgba(34, 197, 94, 0.15);
    border-color: rgba(34, 197, 94, 0.4);
    color: #15803d;
  }
  
  .dark &[data-tone='ahead'] {
    background: rgba(74, 222, 128, 0.25);
    border-color: rgba(74, 222, 128, 0.65);
    color: #86efac;
  }

  &[data-tone='steady'] {
    background: rgba(71, 85, 105, 0.1);
    border-color: rgba(71, 85, 105, 0.3);
  }
  
  .dark &[data-tone='steady'] {
    background: rgba(248, 250, 252, 0.18);
  }

  &[data-tone='behind'] {
    background: rgba(239, 68, 68, 0.15);
    border-color: rgba(239, 68, 68, 0.4);
    color: #b91c1c;
  }
  
  .dark &[data-tone='behind'] {
    background: rgba(248, 113, 113, 0.2);
    border-color: rgba(248, 113, 113, 0.5);
    color: #fca5a5;
  }
`;

export const MomentumSparkline = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.12), transparent 65%),
    rgba(255, 255, 255, 0.08);
  margin: 0.35rem 0 0.75rem;
  overflow: hidden;

  .sparkline__pulse {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #fde68a, #f0abfc, #93c5fd);
    box-shadow: 0 0 35px rgba(251, 191, 36, 0.35);
    animation: ${sparkPulse} 6s ease-in-out infinite;
  }
`;

export const MetricStack = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.1rem;
`;

export const MetricLabel = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.85;
  color: #475569;
  
  .dark & {
    color: rgba(255, 255, 255, 0.75);
  }
`;

export const MetricValue = styled.span`
  display: block;
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  
  .dark & {
    color: #ffffff;
  }
`;

export const MetricDelta = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;

  .dark & {
    color: rgba(255, 255, 255, 0.75);
  }

  &[data-positive='true'] {
    color: #16a34a;
  }
  
  .dark &[data-positive='true'] {
    color: #bbf7d0;
  }
`;

export const MomentumMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin: 1rem 0;

  div {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.08);
  }
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  overflow: hidden;
  margin-bottom: 0.35rem;
`;

export const ProgressFill = styled.div`
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #f9d976, #f39f86);
  transition: width 0.3s ease;
`;

export const QuickInsights = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

export const GoalRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

export const GoalChip = styled.span`
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #1f2937;
  border: 1px dashed rgba(15, 23, 42, 0.3);
  background: rgba(15, 23, 42, 0.08);
  
  .dark & {
    color: var(--dashboard-hero-text);
    border: 1px dashed rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.1);
  }
`; 

export const InsightCard = styled(motion.div)`
  background: var(--bg-light);
  border: 1px solid var(--card-border-strong);
  border-radius: 14px;
  padding: 0.9rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: var(--shadow);
`;

export const InsightIcon = styled.span`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background: var(--sidebar-active-bg);
`;

export const InsightCopy = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InsightLabel = styled.span`
  font-size: 0.8rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  
  .dark & {
    color: #94a3b8;
  }
`;

export const InsightValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  
  .dark & {
    color: #f1f5f9;
  }
`;

// Animated "Create Note" hero tile
export const CreateTile = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  border-radius: 16px;
  color: var(--dashboard-hero-text);
  text-decoration: none;
  overflow: hidden;
  min-height: 200px;
  height: 100%;
  box-shadow: var(--dashboard-hero-shadow);
  border: 1px solid var(--dashboard-hero-border);
  background: var(--dashboard-hero-gradient);
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

export const HeroTileWrapper = styled(motion.div)`
  flex: 1;
  display: flex;
  width: 100%;

  ${CreateTile} {
    flex: 1;
  }
`;

export const TileTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Spark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: var(--tile-spark-bg);
  box-shadow: inset 0 0 0 1px var(--tile-spark-border), 0 4px 10px rgba(0,0,0,0.15);
  font-size: 16px;
`;

export const TileTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.2px;
  text-shadow: 0 1px 0 rgba(0,0,0,0.18);
  color: var(--dashboard-hero-text);
`;

export const TileBody = styled.div`
  margin-top: 0.5rem;
  color: var(--dashboard-hero-text);
  font-size: 0.95rem;
`;

export const TilePoints = styled.ul`
  margin: 0.75rem 0 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.25rem;
  color: var(--dashboard-hero-text);
  li { list-style: '✨  '; }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

export const TileCTA = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  position: relative;
  color: var(--dashboard-cta-text);
  background: var(--dashboard-cta-gradient);
  background-size: 300% 100%;
  animation: ${gradientFlow} 6s linear infinite;
  border: 1px solid var(--dashboard-cta-border);
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
    color: var(--primary-color);
    font-weight: 800;
    box-shadow: 0 4px 10px rgba(0,0,0,0.12);
  }

  &:hover { transform: translateY(-2px); background: rgba(255,255,255,0.24); }
`;

export const Content = styled.main`
  width: 100%;
  margin: 0;
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
export const MainGrid = styled.div<{ $collapsed?: boolean; $rightCollapsed?: boolean }>`
  display: grid;
  /* change the left and right column widths when collapsed */
  grid-template-columns: ${(p) => {
    const left = p.$collapsed ? '72px' : '220px';
    const right = p.$rightCollapsed ? '72px' : '360px';
    return `${left} 1fr ${right}`;
  }};
  gap: 1rem;
  padding: 0 0.5rem 1rem;
  align-items: start;
  transition: grid-template-columns 200ms ease;
  @media ${device.tablet} {
    grid-template-columns: ${(p) => (p.$collapsed ? (p.$rightCollapsed ? '72px 1fr 72px' : '72px 1fr') : (p.$rightCollapsed ? '200px 1fr 72px' : '200px 1fr'))};
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

export const Sidebar = styled.aside`
  position: sticky;
  --top: 20px; /* below header */
  align-self: start;
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0.75rem;
  margin-top: 0.75rem; /* request: some margin at top left */
  box-shadow: var(--shadow);
`;

export const SidebarSectionTitle = styled.div`
  font-size: 0.8rem;
  color: #64748b;
  margin: 0.25rem 0 0.5rem;
  padding: 0 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  
  .dark & {
    color: #94a3b8;
  }
`;

export const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  color: #1f2937;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
  
  .dark & {
    color: #e2e8f0;
  }
  
  &.active {
    background: var(--sidebar-active-bg);
    color: var(--primary-color);
    text-decoration: underline;
  }
  &:hover { background: var(--calendar-chip-hover); }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 0.5rem 0;
`;

export const CalendarWrapper = styled.div`
  position: sticky;
  top: 100px; /* below header */
  align-self: start;
  margin-top: 0.75rem; /* request: some margin at top right */
`;


export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;


export const WelcomeText = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: 0.2px;
  margin: 0;
  font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;
  color: #0f172a;
  
  .dark & {
    color: #f1f5f9;
  }
`;


export const WelcomeWrap = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const GradientName = styled.span`
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color) 45%, #a78bfa);
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

export const Wave = styled.span`
  display: inline-block;
  margin-left: 6px;
  transform-origin: 70% 70%;
  animation: ${wave} 1.6s ease 300ms 1;
`;

export const SubHeading = styled.div`
  font-size: 0.95rem;
  color: #64748b;
  
  .dark & {
    color: #94a3b8;
  }
`;


export const CreateNoteButton = styled(Link)`
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


export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1rem;
  border-radius: 1.5rem;
  margin-bottom: 2rem;
  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const TimelineCard = styled(motion.div)`
  background: var(--bg-light);
  border-radius: 18px;
  border: 1px solid var(--card-border-strong);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  .eyebrow {
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    color: #64748b;
    margin-bottom: 0.3rem;
  }
  
  .dark & .eyebrow {
    color: #94a3b8;
  }

  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #0f172a;
  }
  
  .dark & h3 {
    color: #f1f5f9;
  }
`;

export const TimelineAction = styled.button`
  border: 1px solid var(--card-border-strong);
  background: transparent;
  color: #0f172a;
  padding: 0.45rem 1.15rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  .dark & {
    color: #e2e8f0;
  }

  &:hover {
    background: var(--sidebar-active-bg);
    transform: translateY(-1px);
  }
`;

export const TimelineList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TimelineItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.75rem;
  align-items: flex-start;
`;

export const TimelineBullet = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
  margin-top: 6px;
`;

export const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  .title {
    font-weight: 600;
    color: #0f172a;
  }

  .dark & .title {
    color: #f1f5f9;
  }

  .preview {
    font-size: 0.9rem;
    color: #64748b;
  }
  
  .dark & .preview {
    color: #94a3b8;
  }
`;

export const TimelineTime = styled.span`
  font-size: 0.8rem;
  color: #64748b;
  
  .dark & {
    color: #94a3b8;
  }
`;


export const NoteDate = styled.div`
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.5rem;
  
  .dark & {
    color: #94a3b8;
  }
`;

export const NoteTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #0f172a;
  
  .dark & {
    color: #f1f5f9;
  }
`;

export const EmptyNotes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  color: var(--text-light);
`;

export const EmptyNotesIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

export const EmptyNotesText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #0f172a;
  
  .dark & {
    color: #f1f5f9;
  }
`;

export const EmptyNotesSubtext = styled.div`
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 1rem;
  
  .dark & {
    color: #94a3b8;
  }
`;


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15,23,42,0.45);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBox = styled(Card)`
  max-width: 420px;
  width: 100%;
  background: var(--modal-surface);
  border-radius: 16px;
  box-shadow: var(--modal-shadow);
  border: 1px solid var(--card-border-strong);
  padding: 2rem 1.5rem;
  z-index: 2100;
  position: relative;
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 12px;
  right: 18px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--primary-color);
  cursor: pointer;
`;

export default {} as Record<string, unknown>;

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
  color: var(--text-light);
  margin-bottom: 0.5rem;
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
  color: var(--text-color);
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
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
export const MainGrid = styled.div<{ collapsed?: boolean; rightCollapsed?: boolean }>`
  display: grid;
  /* change the left and right column widths when collapsed */
  grid-template-columns: ${(p) => {
    const left = p.collapsed ? '72px' : '220px';
    const right = p.rightCollapsed ? '72px' : '360px';
    return `${left} 1fr ${right}`;
  }};
  gap: 1rem;
  padding: 0 0.5rem 1rem;
  align-items: start;
  transition: grid-template-columns 200ms ease;
  @media ${device.tablet} {
    grid-template-columns: ${(p) => (p.collapsed ? (p.rightCollapsed ? '72px 1fr 72px' : '72px 1fr') : (p.rightCollapsed ? '200px 1fr 72px' : '200px 1fr'))};
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
  color: var(--text-light);
  margin: 0.25rem 0 0.5rem;
  padding: 0 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  color: var(--text-color);
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
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
  color: var(--text-light);
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


export const NoteDate = styled.div`
  font-size: 0.85rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
`;

export const NoteTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
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
`;

export const EmptyNotesSubtext = styled.div`
  font-size: 0.95rem;
  color: var(--text-light);
  margin-bottom: 1rem;
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

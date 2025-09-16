import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';
import Card from '../components/common/Card';
import { device } from '../styles/breakpoints';

export const DashboardContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%) fixed, radial-gradient(ellipse 80% 60% at 60% 0%, #e0e7ff33 0%, #f8fafc00 100%) fixed;
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
    background: url('data:image/svg+xml;utf8,<svg width="100%25" height="100%25" xmlns="http://www.w3.org/2000/svg"><circle cx="10%25" cy="20%25" r="2.5" fill="%23a5b4fc" opacity="0.18"><animate attributeName="cy" values="20%;80%;20%" dur="8s" repeatCount="indefinite"/></circle><circle cx="80%25" cy="60%25" r="2.5" fill="%23a5b4fc" opacity="0.13"><animate attributeName="cy" values="60%;30%;60%" dur="10s" repeatCount="indefinite"/></circle><circle cx="50%25" cy="40%25" r="3.5" fill="%239ca3af" opacity="0.10"><animate attributeName="cy" values="40%;70%;40%" dur="12s" repeatCount="indefinite"/></circle></svg>');
    background-repeat: no-repeat;
    background-size: cover;
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.2s;
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--text-color);
  transition: box-shadow 0.2s;
`;

// Animated "Create Note" hero tile
export const CreateTile = styled(Link)`
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
  background: rgba(255,255,255,0.2);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.35), 0 4px 10px rgba(0,0,0,0.15);
  font-size: 16px;
`;

export const TileTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.2px;
  text-shadow: 0 1px 0 rgba(0,0,0,0.18);
`;

export const TileBody = styled.div`
  margin-top: 0.5rem;
  color: rgba(255,255,255,0.95);
  font-size: 0.95rem;
`;

export const TilePoints = styled.ul`
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

export const TileCTA = styled.div`
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
export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr 360px;
  gap: 1rem;
  padding: 0 0.5rem 1rem;
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

export const Sidebar = styled.aside`
  position: sticky;
  top: 100px; /* below header */
  align-self: start;
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0.75rem;
  margin-top: 0.75rem; /* request: some margin at top left */
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
  &.active { background: rgba(74,108,247,0.1); color: #4a6cf7; text-decoration: underline; }
  &:hover { background: rgba(0,0,0,0.04); }
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
  margin-bottom: 2rem;
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
  border-radius: 1.5rem
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
  background: rgba(0,0,0,0.18);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBox = styled(Card)`
  max-width: 420px;
  width: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(74,108,247,0.13);
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
  color: #4a6cf7;
  cursor: pointer;
`;

export default {} as Record<string, unknown>;

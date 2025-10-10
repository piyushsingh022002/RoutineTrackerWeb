import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { useNotes } from '../../context/NotesContext';
import { useNotifications } from '../../context/NotificationsContext';

import { device } from '../../styles/breakpoints';
const HeaderContainer = styled.header`
  width: 100vw;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  background: linear-gradient(120deg, rgba(248,250,252,0.92) 0%, rgba(224,231,255,0.92) 100%);
  backdrop-filter: saturate(140%) blur(6px);
  font-family: 'Montserrat', 'Poppins', 'Inter', 'Nunito', Arial, sans-serif;
  position: fixed;
  top: 0;
  z-index: 1000;
  /* Responsive header height variable */
  --header-height: 88px;
  height: var(--header-height);
  @media ${device.tablet} {
    padding: 1rem 1rem;
    --header-height: 72px;
    height: var(--header-height);
  }
  @media ${device.mobile} {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.75rem 0.5rem;
    --header-height: 64px;
    height: var(--header-height);
  }
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 900;
  color: #2b2d42;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  line-height: 1;
`;

const LogoImg = styled.img`
  width: 28px;
  height: 28px;
  display: inline-block;
  object-fit: contain;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  @media ${device.mobile} {
    gap: 0.75rem;
  }
`;

const ExternalLink = styled.a`
  color: #4a6cf7;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  margin-right: 0.5rem;
  transition: color 0.2s;
  &:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }
`;

const StyledNavLink = styled(RouterNavLink)`
  color: var(--text-color);
  text-decoration: none;
  font-weight: 700;
  padding: 0.25rem 0.35rem;
  border-radius: 6px;
  transition: color 160ms var(--easing-out), transform 160ms var(--easing-out), background-color 160ms var(--easing-out);
  &.active {
    color: #4a6cf7;
    text-decoration: underline;
    text-underline-offset: 6px;
    text-decoration-thickness: 2px;
    transform: translateY(-1px);
  }
  &:hover { color: #4a6cf7; background: rgba(74,108,247,0.08); }
`;

// Right-side utilities
const RightGroup = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.35rem;
  border-radius: 8px;
  line-height: 1;
  position: relative;
  transition: background-color 160ms var(--easing-out), transform 160ms var(--easing-out);
  &:hover { background: rgba(74,108,247,0.12); transform: translateY(-1px); }
`;

const Badge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ef4444;
  color: #fff;
  font-size: 0.65rem;
  min-width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0 5px;
`;

const StreakPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  color: #f97316; /* orange */
  background: #fff7ed;
  border: 1px solid #fed7aa;
  padding: 6px 10px;
  border-radius: 999px;
  margin: 0 6px;
`;

const AvatarButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 2px;
`;

const Avatar = styled.div<{ $src?: string; }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover no-repeat` : 'linear-gradient(135deg,#4a6cf7,#60a5fa)'};
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
`;

// Profile dropdown (replaces sidebar)
const ProfileDropdown = styled.div`
  position: absolute;
  top: calc(var(--header-height) - 8px);
  right: 16px;
  width: 320px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(2,6,23,0.15);
  padding: 16px 14px 12px 14px;
  z-index: 1200;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 6px 12px 6px;
`;

const ProfileName = styled.div`
  font-weight: 700;
  color: #111827;
`;

const QuickGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px 4px 14px 4px;
`;

const QuickItem = styled.div`
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #374151;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 6px;
`;

const MenuItem = styled.button`
  background: transparent;
  border: none;
  text-align: left;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover { background: #f3f4f6; }
`;



const Header: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const { notes } = useNotes();
  const { notifications } = useNotifications();
  const unreadCount = notifications ? notifications.filter((n) => !n.isRead).length : 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getUserInitials = () => {
    if (!user?.name) return '';
    return user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  // Compute current streak based on notes' createdAt dates
  const currentStreak = useMemo(() => {
    if (!notes || notes.length === 0) return 0;
    const dates = Array.from(
      new Set(
        notes
          .filter((n) => n && n.createdAt)
          .map((n) => new Date(n.createdAt))
          .map((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime())
      )
    ).sort((a, b) => b - a);
    let streak = 0;
    const today = new Date();
    let cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    let idx = 0;
    while (idx < dates.length) {
      if (dates[idx] === cursor) {
        streak += 1;
        cursor -= 24 * 60 * 60 * 1000; // previous day
        idx += 1;
      } else if (dates[idx] === cursor - 24 * 60 * 60 * 1000) {
        // If today missing but yesterday present, streak starts from yesterday only if today has no note
        if (streak === 0) {
          // Allow starting at yesterday if no today note
          streak += 1;
          cursor -= 24 * 60 * 60 * 1000;
          idx += 1;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return streak;
  }, [notes]);

  // Close menu on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [menuOpen]);

  return (
    <>
      <HeaderContainer>
        <LeftGroup>
          <Logo to={isAuthenticated ? '/dashboard' : '/'} aria-label="Home">
            <LogoImg
              src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4ca.png"
              alt="Routine Tracker logo (progress bars)"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </Logo>
          {!isLoading && (
            <Nav>
              <StyledNavLink to="/aboutIRT">About Us</StyledNavLink>
              {/* External text editor */}
              <ExternalLink href="https://text-utils-piyush.vercel.app/" target="_blank" rel="noopener noreferrer" title="Text Editor">
                Text Editor
              </ExternalLink>
              {isAuthenticated && (
                <StyledNavLink to="/dashboard" onClick={() => {
                  console.debug('Header: Dashboard link clicked');
                }}>Dashboard</StyledNavLink>
              )}
            </Nav>
          )}
        </LeftGroup>

        {isAuthenticated && !isLoading ? (
          <RightGroup>
            {/* Notifications */}
            <IconButton aria-label="Notifications" onClick={() => navigate('/notifications')}>
              <span role="img" aria-label="bell">🔔</span>
              {unreadCount > 0 && <Badge>{unreadCount > 9 ? '9+' : unreadCount}</Badge>}
            </IconButton>

            {/* Streak */}
            <StreakPill title="Current streak">
              <span role="img" aria-label="streak">🔥</span>
              {currentStreak}
            </StreakPill>

            {/* Premium button */}
            <Button variant="primary" size="small" shape="pill" onClick={() => navigate('/noteplus')}>
              Premium
            </Button>

            {/* Profile avatar */}
            <div style={{ position: 'relative' }} ref={menuRef}>
              <AvatarButton aria-label="User menu" onClick={() => setMenuOpen((v) => !v)}>
                <Avatar $src={user?.avatarUrl}>{!user?.name ? '' : getUserInitials()}</Avatar>
              </AvatarButton>
              {menuOpen && (
                <ProfileDropdown>
                  <ProfileHeader>
                    <Avatar $src={user?.avatarUrl} />
                    <div>
                      <ProfileName>{user?.name || 'User'}</ProfileName>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>{user?.email}</div>
                    </div>
                  </ProfileHeader>
                  <QuickGrid>
                    <QuickItem title="My Lists">📋<div>My Lists</div></QuickItem>
                    <QuickItem title="Notebook">📘<div>Notebook</div></QuickItem>
                    <QuickItem title="Submissions">📝<div>Submissions</div></QuickItem>
                    <QuickItem title="Progress">🟢<div>Progress</div></QuickItem>
                    <QuickItem title="Points">🟡<div>Points</div></QuickItem>
                    <QuickItem title="Try New Features">🧪<div>Try New</div></QuickItem>
                  </QuickGrid>
                  <Menu>
                    <MenuItem onClick={() => navigate('/settings')}>⚙️ Settings</MenuItem>
                    <MenuItem onClick={toggleTheme}>🌓 Appearance</MenuItem>
                    <MenuItem onClick={handleLogout}>🚪 Sign Out</MenuItem>
                  </Menu>
                </ProfileDropdown>
              )}
            </div>
          </RightGroup>
        ) : (
          !isLoading && (
            <div style={{ marginLeft: 'auto' }}>
              <ExternalLink
                href="https://my-portfolio-kappa-five-56.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                title="Admin's Portal"
              >
                Admin's Portal
              </ExternalLink>
            </div>
          )
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;

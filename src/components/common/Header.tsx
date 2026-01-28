import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotes } from '../../context/NotesContext';
import { useNotifications } from '../../context/NotificationsContext';

import {
  HeaderContainer,
  LeftGroup,
  Logo,
  LogoImg,
  Nav,
  ExternalLink,
  StyledNavLink,
  RightGroup,
  IconButton,
  Badge,
  StreakPill,
  AvatarButton,
  Avatar,
  ProfileDropdown,
  ProfileHeader,
  ProfileName,
  QuickGrid,
  QuickItem,
  Menu,
  MenuItem,
  AdminLinkWrapper,
  AdminTooltip,
} from '../common.styles/Header.styles';

import MyListsModal from '../notes/MyListsModal';
import ROUTE_PATHS from '../../routes/RoutePaths';

// Logo image
import recotrackLogo from '../../../Logos/recotrack.logo.png';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme, resetTheme, appearanceEnabled } = useTheme();
  const { notes } = useNotes();
  const { notifications } = useNotifications();
  const unreadCount = notifications ? notifications.filter((n) => !n.isRead).length : 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMyLists, setShowMyLists] = useState(false);
  const [showThemeTooltip, setShowThemeTooltip] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Ensure profile menu is closed whenever MyLists modal is opened.
  useEffect(() => {
    if (showMyLists && menuOpen) setMenuOpen(false);
  }, [showMyLists, menuOpen]);

  const handleLogout = () => {
    logout();
    resetTheme();
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
              src={recotrackLogo}
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
          <>
          <RightGroup>
            {/* Theme toggle */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => !appearanceEnabled && setShowThemeTooltip(true)}
              onMouseLeave={() => setShowThemeTooltip(false)}
            >
              <IconButton
                type="button"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                aria-pressed={theme === 'dark'}
                title={appearanceEnabled ? (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode') : ''}
                onClick={toggleTheme}
                disabled={!appearanceEnabled}
                style={{
                  opacity: appearanceEnabled ? 1 : 0.5,
                  cursor: appearanceEnabled ? 'pointer' : 'not-allowed'
                }}
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </IconButton>
              {showThemeTooltip && !appearanceEnabled && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '8px',
                    padding: '8px 12px',
                    background: '#333',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    zIndex: 1000,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    pointerEvents: 'none'
                  }}
                >
                  Turn the Appearance on in the settings
                  <div
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                      borderBottom: '4px solid #333'
                    }}
                  />
                </div>
              )}
            </div>

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
                      <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{user?.email}</div>
                    </div>
                  </ProfileHeader>
                  <QuickGrid>
                    <QuickItem
                      title="My Lists"
                      onClick={() => {
                        setShowMyLists(true);
                        setMenuOpen(false);
                      }}
                    >📋<div>My Lists</div></QuickItem>
                    <QuickItem
                      title="Notebook"
                      onClick={() => {
                        navigate(ROUTE_PATHS.NOTEBOOK);
                        setMenuOpen(false);
                      }}
                    >📘<div>Notebook</div></QuickItem>
                    <QuickItem
                      title="Submissions"
                      onClick={() => {
                        navigate(ROUTE_PATHS.NOTFOUND);
                        setMenuOpen(false);
                      }}
                    >📝<div>Submissions</div></QuickItem>
                    <QuickItem
                      title="Progress"
                      onClick={() => {
                        navigate(ROUTE_PATHS.PROGRESS);
                        setMenuOpen(false);
                      }}
                    >🟢<div>Progress</div></QuickItem>
                    <QuickItem
                      title="Points"
                      onClick={() => {
                        navigate(ROUTE_PATHS.NOTFOUND);
                        setMenuOpen(false);
                      }}
                    >🟡<div>Points</div></QuickItem>
                    <QuickItem
                      title="Try New Features"
                      onClick={() => {
                        navigate(ROUTE_PATHS.NOTFOUND);
                        setMenuOpen(false);
                      }}
                    >🧪<div>Try New</div></QuickItem>
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
          <MyListsModal open={showMyLists} onClose={() => setShowMyLists(false)} />
          </>
        ) : (
          !isLoading && (
            <div style={{ marginLeft: 'auto' }}>
              <AdminLinkWrapper>
                <ExternalLink
                  href="https://my-portfolio-kappa-five-56.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Admin's Portal
                </ExternalLink>
                <AdminTooltip role="status" aria-live="polite">
                  <strong>Admin Notice</strong>
                  Hovering here reveals this notice. Click the button to visit the admin's portfolio.
                </AdminTooltip>
              </AdminLinkWrapper>
            </div>
          )
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;

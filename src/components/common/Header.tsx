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
} from '../common.styles/Header.styles';

import MyListsModal from '../notes/MyListsModal';
import ROUTE_PATHS from '../../routes/RoutePaths';

// Logo image
import recotrackLogo from '../../../Logos/recotrack.logo.png';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const { notes } = useNotes();
  const { notifications } = useNotifications();
  const unreadCount = notifications ? notifications.filter((n) => !n.isRead).length : 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMyLists, setShowMyLists] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Ensure profile menu is closed whenever MyLists modal is opened.
  useEffect(() => {
    if (showMyLists && menuOpen) setMenuOpen(false);
  }, [showMyLists, menuOpen]);

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
          <MyListsModal open={showMyLists} onClose={() => setShowMyLists(false)} />
          </>
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

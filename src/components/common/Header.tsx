import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a6cf7;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoIcon = styled.span`
  font-size: 1.8rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: #555;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #4a6cf7;
  }
`;


const Hamburger = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  margin-left: 0.5rem;
  z-index: 110;
  &:focus {
    outline: 2px solid var(--primary-color);
  }
`;

const Bar = styled.span`
  width: 22px;
  height: 3px;
  background: #333;
  margin: 2px 0;
  border-radius: 2px;
  display: block;
`;

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.2);
  z-index: 120;
`;

const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background: #fff;
  box-shadow: -2px 0 12px rgba(0,0,0,0.08);
  z-index: 130;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem 1rem 1.5rem;
  transition: transform 0.3s cubic-bezier(.4,0,.2,1);
`;

const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const SidebarAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--primary-color);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const SidebarUserName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: #222;
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: auto;
`;

const SidebarNavLink = styled(Link)`
  color: #333;
  font-size: 1.05rem;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: background 0.2s;
  &:hover {
    background: var(--bg-color);
    color: var(--primary-color);
  }
`;

const SidebarBottom = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;



const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getUserInitials = () => {
    if (!user?.username) return '';
    return user.username
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <HeaderContainer>
        <Logo to={isAuthenticated ? '/dashboard' : '/'}>
          <LogoIcon>📝</LogoIcon>
          Intern Routine Tracker
        </Logo>

        <Nav>
          {isAuthenticated ? (
            <>
              <Hamburger onClick={() => setSidebarOpen(true)} aria-label="Open user menu">
                <Bar />
                <Bar />
                <Bar />
              </Hamburger>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">
                <Button 
                  variant="primary"
                  size="small"
                >
                  Register
                </Button>
              </NavLink>
            </>
          )}
        </Nav>
      </HeaderContainer>

      {sidebarOpen && (
        <>
          <SidebarOverlay onClick={() => setSidebarOpen(false)} />
          <Sidebar>
            <SidebarHeader>
              <SidebarAvatar>{getUserInitials()}</SidebarAvatar>
              <SidebarUserName>{user?.username}</SidebarUserName>
            </SidebarHeader>
            <SidebarNav>
              <SidebarNavLink to="/dashboard" onClick={() => setSidebarOpen(false)}>Dashboard</SidebarNavLink>
              <SidebarNavLink to="/notes/new" onClick={() => setSidebarOpen(false)}>New Note</SidebarNavLink>
              <SidebarNavLink to="/profile" onClick={() => setSidebarOpen(false)}>Profile</SidebarNavLink>
              <SidebarNavLink to="/settings" onClick={() => setSidebarOpen(false)}>Settings</SidebarNavLink>
              <Button
                variant="outline"
                size="small"
                onClick={toggleTheme}
                style={{ minWidth: 40, marginTop: 8 }}
                leftIcon={theme === 'light' ? '🌙' : '☀️'}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? 'Dark' : 'Light'}
              </Button>
            </SidebarNav>
            <SidebarBottom>
              <Button 
                variant="primary"
                size="small"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </SidebarBottom>
          </Sidebar>
        </>
      )}
    </>
  );
};

export default Header;

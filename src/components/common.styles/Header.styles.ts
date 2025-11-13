import styled from 'styled-components';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { device } from '../../styles/breakpoints';

export const HeaderContainer = styled.header`
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

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 900;
  color: #2b2d42;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  line-height: 1;
`;

export const LogoImg = styled.img`
  width: 28px;
  height: 28px;
  display: inline-block;
  object-fit: contain;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  @media ${device.mobile} {
    gap: 0.75rem;
  }
`;

export const ExternalLink = styled.a`
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

export const StyledNavLink = styled(RouterNavLink)`
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
export const RightGroup = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const IconButton = styled.button`
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

export const Badge = styled.span`
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

export const StreakPill = styled.div`
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

export const AvatarButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 2px;
`;

export const Avatar = styled.div<{ $src?: string; }>`
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
export const ProfileDropdown = styled.div`
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

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 6px 12px 6px;
`;

export const ProfileName = styled.div`
  font-weight: 700;
  color: #111827;
`;

export const QuickGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px 4px 14px 4px;
`;

export const QuickItem = styled.div`
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

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 6px;
`;

export const MenuItem = styled.button`
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

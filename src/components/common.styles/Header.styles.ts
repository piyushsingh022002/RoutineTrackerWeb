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
  background: var(--header-gradient);
  backdrop-filter: saturate(140%) blur(6px);
  font-family: 'Montserrat', 'Poppins', 'Inter', 'Nunito', Arial, sans-serif;
  position: fixed;
  top: 0;
  z-index: 1000;
  /* Responsive header height variable */
  --header-height: 65px;
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
  /* Compact logo wrapper: keep image and optional brand text aligned */
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
  color: #2b2d42;
  text-decoration: none;
  font-weight: 900;
  font-size: 1rem;
  line-height: 1;
  padding: 0.15rem 0.25rem;
  & .brand-text {
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: -0.5px;
  }
`;

export const LogoImg = styled.img`
  /* Larger logo sizes so the image is clearly visible */
  --width: 56px;
  --height: 56px;
  --max-height: calc(var(--header-height));
  height: calc(var(--header-height) - 8px);
  width: auto;
  max-height: 100%;
  display: inline-block;
  object-fit: contain;
  vertical-align: middle;
  margin-right: 0.5rem;
  @media ${device.tablet} {
    width: 48px;
    height: 48px;
  }
  @media ${device.mobile} {
    width: 40px;
    height: 40px;
  }
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
  color: var(--header-link);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  margin-right: 0.5rem;
  transition: color 0.2s;
  &:hover {
    color: var(--header-link-hover);
    text-decoration: underline;
  }
`;

export const AdminLinkWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 0.5rem;

  &:hover > div {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

export const AdminTooltip = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 240px;
  padding: 12px 14px;
  background: linear-gradient(135deg, #0ea5e9 0%, #4f46e5 100%);
  color: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.22);
  border: 1px solid rgba(255,255,255,0.08);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.18s ease, transform 0.18s ease;
  pointer-events: none;
  z-index: 1500;
  font-size: 0.92rem;
  line-height: 1.4;

  strong {
    display: block;
    margin-bottom: 4px;
    font-weight: 800;
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
    color: var(--primary-color);
    text-decoration: underline;
    text-underline-offset: 6px;
    text-decoration-thickness: 2px;
    transform: translateY(-1px);
  }
  &:hover { color: var(--primary-color); background: var(--calendar-chip-hover); }
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
  color: inherit;
  &:hover { background: var(--calendar-chip-hover); transform: translateY(-1px); }
`;

export const Badge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  background: var(--badge-bg);
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
  color: var(--streak-pill-color);
  background: var(--streak-pill-bg);
  border: 1px solid var(--streak-pill-border);
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
  background: var(--dropdown-bg);
  border-radius: 16px;
  box-shadow: var(--dropdown-shadow);
  border: 1px solid var(--card-border-strong);
  padding: 16px 14px 12px 14px;
  z-index: 1200;
  color: var(--text-color);
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 6px 12px 6px;
`;

export const ProfileName = styled.div`
  font-weight: 700;
  color: var(--text-color);
`;

export const QuickGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px 4px 14px 4px;
`;

export const QuickItem = styled.div`
  background: var(--quick-item-bg);
  border: 1px solid var(--quick-item-border);
  border-radius: 12px;
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--quick-item-color);
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
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover { background: var(--menu-hover-bg); }
`;

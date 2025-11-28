import React from 'react';
import {
  Sidebar as StyledSidebar,
  SidebarSectionTitle,
  SidebarLink,
  Divider,
} from '../../pages.styles/Dashboard.styles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Props {
  collapsed?: boolean;
  onToggle?: () => void;
}

const navItems = [
  { to: '/notes/new', icon: '➕', label: 'New Note' },
  { to: '/noteplus', icon: '🤖', label: 'ChatGPT' },
  { to: '/teams', icon: '👥', label: 'Teams' },
  { to: '/notes?filter=favorite', icon: '⭐', label: 'Favourite Notes' },
  { to: '/notes?filter=important', icon: '❗', label: 'Important Notes' },
  { to: '/notes', icon: '🗂️', label: 'All Notes' },
  { to: '/notes?filter=deleted', icon: '🗑️', label: 'Deleted Notes' },
];

const DashboardSidebar: React.FC<Props> = ({ collapsed = false, onToggle }) => {
  return (
    <StyledSidebar>
      <div style={{ display: 'flex', justifyContent: collapsed ? 'center' : 'space-between', alignItems: 'center', marginBottom: 8 }}>
        {!collapsed && <SidebarSectionTitle>Menu</SidebarSectionTitle>}
        <button
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: 'var(--text-color)',
            padding: 6,
            borderRadius: 8,
          }}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Render navigation: when collapsed show icon only with tooltip (title) */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {navItems.slice(0, 2).map((it) => (
          <SidebarLink key={it.to} to={it.to} title={it.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 20, textAlign: 'center' }}>{it.icon}</span>
            {!collapsed && <span>{it.label}</span>}
          </SidebarLink>
        ))}

        <SidebarSectionTitle style={{ marginTop: 8 }}>{!collapsed ? 'Collaboration' : ''}</SidebarSectionTitle>
        <SidebarLink to="/teams" title="Teams" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 20, textAlign: 'center' }}>👥</span>
          {!collapsed && <span>Teams</span>}
        </SidebarLink>

        <Divider />

        <SidebarSectionTitle style={{ marginTop: 8 }}>{!collapsed ? 'Browse' : ''}</SidebarSectionTitle>
        {navItems.slice(2).map((it) => (
          <SidebarLink key={it.to} to={it.to} title={it.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 20, textAlign: 'center' }}>{it.icon}</span>
            {!collapsed && <span>{it.label}</span>}
          </SidebarLink>
        ))}
      </nav>
    </StyledSidebar>
  );
};

export default DashboardSidebar;

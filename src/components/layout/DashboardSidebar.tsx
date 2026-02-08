import React, { useEffect } from 'react';
import {
  Sidebar as StyledSidebar,
  SidebarSectionTitle,
  SidebarLink,
  Divider,
} from '../../pages.styles/Dashboard.styles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNotes } from '../../context/NotesContext';
import { useAuth } from '../../context/AuthContext';

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
  const { favouriteNotes, importantNotes, deletedNotes, getFavouriteNotes, getImportantNotes, getDeletedNotes, isLoading } = useNotes();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      getFavouriteNotes();
      getImportantNotes();
      getDeletedNotes();
    }
  }, [isAuthenticated, getFavouriteNotes, getImportantNotes, getDeletedNotes]);

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

        {/* Favourite Notes Section */}
        {Array.isArray(favouriteNotes) && favouriteNotes.length > 0 && (
          <>
            <Divider />
            <SidebarSectionTitle style={{ marginTop: 8 }}>
              {!collapsed ? `Favourites (${favouriteNotes.length})` : ''}
            </SidebarSectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {favouriteNotes.slice(0, 5).map((note) => (
                <SidebarLink
                  key={note.id}
                  to={`/notes/${note.id}`}
                  title={note.title}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: '0.9em',
                    padding: '6px 8px',
                  }}
                >
                  <span style={{ width: 20, textAlign: 'center' }}>⭐</span>
                  {!collapsed && (
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {note.title || 'Untitled'}
                    </span>
                  )}
                </SidebarLink>
              ))}
              {favouriteNotes.length > 5 && !collapsed && (
                <SidebarLink
                  to="/notes?filter=favorite"
                  title="View all favourites"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: '0.85em',
                    padding: '4px 8px',
                    fontStyle: 'italic',
                  }}
                >
                  <span style={{ width: 20, textAlign: 'center' }}>→</span>
                  <span>View all ({favouriteNotes.length})</span>
                </SidebarLink>
              )}
            </div>
          </>
        )}

        {/* Important Notes Section */}
        {Array.isArray(importantNotes) && importantNotes.length > 0 && (
          <>
            <Divider />
            <SidebarSectionTitle style={{ marginTop: 8 }}>
              {!collapsed ? `Important (${importantNotes.length})` : ''}
            </SidebarSectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {importantNotes.slice(0, 5).map((note) => (
                <SidebarLink
                  key={note.id}
                  to={`/notes/${note.id}`}
                  title={note.title}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: '0.9em',
                    padding: '6px 8px',
                  }}
                >
                  <span style={{ width: 20, textAlign: 'center' }}>❗</span>
                  {!collapsed && (
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {note.title || 'Untitled'}
                    </span>
                  )}
                </SidebarLink>
              ))}
              {importantNotes.length > 5 && !collapsed && (
                <SidebarLink
                  to="/notes?filter=important"
                  title="View all important notes"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: '0.85em',
                    padding: '4px 8px',
                    fontStyle: 'italic',
                  }}
                >
                  <span style={{ width: 20, textAlign: 'center' }}>→</span>
                  <span>View all ({importantNotes.length})</span>
                </SidebarLink>
              )}
            </div>
          </>
        )}

        {/* Deleted Notes Section */}
        {Array.isArray(deletedNotes) && deletedNotes.length > 0 && (
          <>
            <Divider />
            <SidebarSectionTitle style={{ marginTop: 8 }}>
              {!collapsed ? `Trash (${deletedNotes.length})` : ''}
            </SidebarSectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {deletedNotes.slice(0, 5).map((note) => (
                <SidebarLink
                  key={note.id}
                  to={`/notes/${note.id}`}
                  title={note.title}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: '0.9em',
                    padding: '6px 8px',
                  }}
                >
                  <span style={{ width: 20, textAlign: 'center' }}>🗑️</span>
                  {!collapsed && (
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {note.title || 'Untitled'}
                    </span>
                  )}
                </SidebarLink>
              ))}
              {deletedNotes.length > 5 && !collapsed && (
                <SidebarLink
                  to="/notes?filter=deleted"
                  title="View all deleted notes"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: '0.85em',
                    padding: '4px 8px',
                    fontStyle: 'italic',
                  }}
                >
                  <span style={{ width: 20, textAlign: 'center' }}>→</span>
                  <span>View all ({deletedNotes.length})</span>
                </SidebarLink>
              )}
            </div>
          </>
        )}

        {isLoading && (
          <div style={{ padding: '8px', fontSize: '0.9em', color: 'var(--text-muted)' }}>
            {!collapsed && 'Loading notes...'}
          </div>
        )}
      </nav>
    </StyledSidebar>
  );
};

export default DashboardSidebar;

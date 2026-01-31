import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import {
  SettingPageContainer,
  LeftSection,
  SectionHeader,
  ProfileWrapper,
  Avatar,
  UserName,
  UserEmail,
  UserJoined,
  SignOutWrapper,
  RightSection,
  SettingsContent,
  SettingButton,
  UserInfo,
  UserInfoWrapper,
} from '../pages.styles/SettingPage.styles';
import Button from '../components/common/Button';

import SettingsModal from '../components/Modal/SettingsModal';

const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }> = ({ checked, onChange, disabled = false }) => (
  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
    <div
      onClick={() => !disabled && onChange(!checked)}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => { if (!disabled && (e.key === 'Enter' || e.key === ' ')) onChange(!checked); }}
      style={{
        width: 44,
        height: 26,
        borderRadius: 999,
        background: checked ? '#4a6cf7' : '#e6e9ef',
        position: 'relative',
        transition: 'background 0.2s ease',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 3,
        left: checked ? 22 : 3,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        transition: 'left 0.18s ease'
      }} />
    </div>
  </label>
);

const SettingCard: React.FC<{ title: string; desc?: string; actions?: React.ReactNode }> = ({ title, desc, actions }) => (
  <UserInfoWrapper>
    <UserInfo style={{ padding: '1rem 1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div>{actions}</div>
      </div>
      {desc && <div style={{ marginTop: 8, color: '#556', fontSize: 13 }}>{desc}</div>}
    </UserInfo>
  </UserInfoWrapper>
);

const SettingPage: React.FC = () => {
  const navigate = useNavigate();
  const { appearanceEnabled, setAppearanceEnabled } = useTheme();
  const { user, logout } = useAuth();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [emailNotif, setEmailNotif] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };
  const handleGoHome = () => navigate('/dashboard');

  const handleSave = () => {
    // TODO: Implement API call to update user profile
    alert('Profile saved - API integration pending');
    setEditMode(false);
  };

  const handleAvatarClick = () => fileRef.current?.click();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // TODO: Implement avatar upload to API
    alert('Avatar upload - API integration pending');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <SettingPageContainer>
      <LeftSection>
        <div style={{ width: '100%' }}>
          <SectionHeader>Profile</SectionHeader>
          <ProfileWrapper>
            <div style={{ position: 'relative' }}>
              <Avatar
                src={user.profile?.avatarUrl || '/default-avatar.png'}
                alt="Profile Image"
                onClick={handleAvatarClick}
                style={{ cursor: 'pointer' }}
              />
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
              <div style={{ position: 'absolute', right: -6, bottom: -6, background: '#fff', borderRadius: 8, padding: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
                <button onClick={handleAvatarClick} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} aria-label="Edit avatar">✏️</button>
              </div>
            </div>

            {!editMode ? (
              <>
                <UserName>{user.fullName}</UserName>
                <UserEmail>@{user.username}</UserEmail>
                <UserEmail>{user.email}</UserEmail>
                <UserEmail>{user.phoneNumber}</UserEmail>
                <UserJoined>Joined: {new Date(user.createdAt).toLocaleDateString()}</UserJoined>
              </>
            ) : (
              <div style={{ width: '100%' }}>
                <label style={{ display: 'block', fontSize: 12, color: '#444' }}>Full Name</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, marginTop: 6, border: '1px solid #e6e9ef' }} />
                <label style={{ display: 'block', marginTop: 8, fontSize: 12, color: '#444' }}>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, marginTop: 6, border: '1px solid #e6e9ef' }} />
                <label style={{ display: 'block', marginTop: 8, fontSize: 12, color: '#444' }}>Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, marginTop: 6, border: '1px solid #e6e9ef' }} />
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <SettingButton onClick={handleSave}>Save</SettingButton>
                  <SettingButton onClick={() => { setEditMode(false); setFullName(user.fullName); setEmail(user.email); setPhone(user.phoneNumber); }}>Cancel</SettingButton>
                </div>
              </div>
            )}
          </ProfileWrapper>
        </div>

        <AnimatePresence>
          {!editMode && (
            <motion.div
              initial={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%', overflow: 'hidden' }}
            >
              <SignOutWrapper style={{ gap: 12 }}>
                <SettingButton onClick={() => setEditMode(true)}>Edit Profile</SettingButton>
                <SettingButton onClick={handleSignOut}>Sign Out</SettingButton>
              </SignOutWrapper>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
          <Button
            variant="outline"
            size="medium"
            shape="pill"
            type="button"
            onClick={handleGoHome}
          >
            Home
          </Button>
        </div>
      </LeftSection>

      <RightSection>
        <SettingsContent>
          <SettingCard
            title="Account"
            desc="Manage your basic account details and connected information."
            actions={<SettingButton onClick={() => setShowSettingsModal(true)}>Modify</SettingButton>}
          />

          <SettingsModal
            open={showSettingsModal}
            onClose={() => setShowSettingsModal(false)}
            user={user}
            onSave={() => {
              // TODO: Implement save functionality
              setShowSettingsModal(false);
            }}
          />

          <SettingCard
            title="Security"
            desc="Enable two-factor authentication and review active sessions."
            actions={<Toggle checked={twoFactor} onChange={setTwoFactor} />}
          />

          <SettingCard
            title="Notifications"
            desc="Control email updates and notification preferences."
            actions={<Toggle checked={emailNotif} onChange={setEmailNotif} disabled />}
          />

          <SettingCard
            title="Appearance"
            desc="Switch between light and dark modes for a comfortable view."
            actions={<Toggle checked={appearanceEnabled} onChange={setAppearanceEnabled} />}
          />

          <SettingCard
            title="Integrations"
            desc="Connect third-party services like Google Calendar or Dropbox."
            actions={<SettingButton onClick={() => alert('Open integrations')}>Connect</SettingButton>}
          />

          <SettingCard
            title="Support"
            desc="Contact support or submit feedback about the app."
            actions={<SettingButton onClick={() => alert('Contact support')}>Contact</SettingButton>}
          />
        </SettingsContent>
      </RightSection>
    </SettingPageContainer>
  );
};

export default SettingPage;

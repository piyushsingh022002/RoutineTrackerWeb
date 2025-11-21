import React, { useRef, useState } from 'react';
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
  UserInfoWrapper
} from '../pages.styles/SettingPage.styles';
import type { User } from '../types/index';

// Dummy user for demo
const dummyUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: '2023-08-20',
  avatarUrl: ''
};

const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
    <div
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onChange(!checked); }}
      style={{
        width: 44,
        height: 26,
        borderRadius: 999,
        background: checked ? '#4a6cf7' : '#e6e9ef',
        position: 'relative',
        transition: 'background 0.2s ease'
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
  const [user, setUser] = useState<User>(dummyUser);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleSignOut = () => alert('Signing out...');

  const handleSave = () => {
    setUser((u) => ({ ...u, name, email }));
    setEditMode(false);
    alert('Profile saved');
  };

  const handleAvatarClick = () => fileRef.current?.click();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUser((u) => ({ ...u, avatarUrl: url }));
  };

  return (
    <SettingPageContainer>
      <LeftSection>
        <div style={{ width: '100%' }}>
          <SectionHeader>Profile</SectionHeader>
          <ProfileWrapper>
            <div style={{ position: 'relative' }}>
              <Avatar
                src={user.avatarUrl || '/default-avatar.png'}
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
                <UserName>{user.name}</UserName>
                <UserEmail>{user.email}</UserEmail>
                <UserJoined>Joined: {new Date(user.createdAt).toLocaleDateString()}</UserJoined>
              </>
            ) : (
              <div style={{ width: '100%' }}>
                <label style={{ display: 'block', fontSize: 12, color: '#444' }}>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, marginTop: 6, border: '1px solid #e6e9ef' }} />
                <label style={{ display: 'block', marginTop: 8, fontSize: 12, color: '#444' }}>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, marginTop: 6, border: '1px solid #e6e9ef' }} />
                <label style={{ display: 'block', marginTop: 8, fontSize: 12, color: '#444' }}>Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Optional" style={{ width: '100%', padding: 8, borderRadius: 8, marginTop: 6, border: '1px solid #e6e9ef' }} />
              </div>
            )}
          </ProfileWrapper>
        </div>

        <SignOutWrapper style={{ gap: 12 }}>
          {!editMode ? (
            <>
              <SettingButton onClick={() => setEditMode(true)}>Edit Profile</SettingButton>
              <SettingButton onClick={handleSignOut}>Sign Out</SettingButton>
            </>
          ) : (
            <>
              <SettingButton onClick={handleSave}>Save</SettingButton>
              <SettingButton onClick={() => { setEditMode(false); setName(user.name); setEmail(user.email); }}>Cancel</SettingButton>
            </>
          )}
        </SignOutWrapper>
      </LeftSection>

      <RightSection>
        <SettingsContent>
          <SettingCard
            title="Account"
            desc="Manage your basic account details and connected information."
            actions={<SettingButton onClick={() => alert('Open account settings')}>Manage</SettingButton>}
          />

          <SettingCard
            title="Security"
            desc="Enable two-factor authentication and review active sessions."
            actions={<Toggle checked={twoFactor} onChange={setTwoFactor} />}
          />

          <SettingCard
            title="Notifications"
            desc="Control email updates and notification preferences."
            actions={<Toggle checked={emailNotif} onChange={setEmailNotif} />}
          />

          <SettingCard
            title="Appearance"
            desc="Switch between light and dark modes for a comfortable view."
            actions={<Toggle checked={darkMode} onChange={setDarkMode} />}
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

import React, { useState } from 'react';
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
  SettingRow,
  SettingButton
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

const SettingPage: React.FC = () => {
  const [user] = useState<User>(dummyUser);

  const handleSignOut = () => alert('Signing out...');
  const handleAction = (action: string) => alert(action);

  return (
    <SettingPageContainer>
      {/* Left Section: Profile */}
      <LeftSection>
        <div>
          <SectionHeader>User Profile</SectionHeader>
          <ProfileWrapper>
            <Avatar src={user.avatarUrl || '/default-avatar.png'} alt="Profile Image" />
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
            <UserJoined>Joined: {new Date(user.createdAt).toLocaleDateString()}</UserJoined>
          </ProfileWrapper>
        </div>
        <SignOutWrapper>
          <SettingButton onClick={handleSignOut}>Sign Out</SettingButton>
        </SignOutWrapper>
      </LeftSection>

      {/* Right Section: Settings */}
      <RightSection>
        <SettingsContent>
          <SettingRow>
            <div>Username: <strong>{user.name}</strong></div>
            <SettingButton onClick={() => handleAction('Change Username')}>Change Username</SettingButton>
          </SettingRow>

          <SettingRow>
            <div>Password</div>
            <SettingButton onClick={() => handleAction('Change Password')}>Change Password</SettingButton>
          </SettingRow>

          <SettingRow>
            <div>Email: <strong>{user.email}</strong></div>
            <SettingButton onClick={() => handleAction('Update Email')}>Update Email</SettingButton>
          </SettingRow>

          <SettingRow>
            <div>Phone Number</div>
            <SettingButton onClick={() => handleAction('Update Phone Number')}>Update Phone Number</SettingButton>
          </SettingRow>

          <SettingRow>
            <div>Profile Picture</div>
            <SettingButton onClick={() => handleAction('Update Profile Picture')}>Update Picture</SettingButton>
          </SettingRow>

          <SettingRow>
            <div>Contact Admin</div>
            <SettingButton onClick={() => handleAction('Contact Admin')}>Contact Admin</SettingButton>
            <div style={{ marginTop: '0.25rem', fontSize: '0.85rem', color: '#555' }}>Piyush Singh</div>
          </SettingRow>
        </SettingsContent>
      </RightSection>
    </SettingPageContainer>
  );
};

export default SettingPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiCamera, FiTrash2, FiEdit2, FiLogOut, FiMail, FiUser, FiKey } from 'react-icons/fi';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Header } from '../components/common';

const PageBackground = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 3rem auto 2rem auto;
  padding: 0 2rem;
  width: 100%;
  align-items: flex-start;
  @media (max-width: 1100px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 1.5rem;
  }
`;

const ProfileCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 280px;
  max-width: 340px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10);
  background: #f9fafb;
`;

const AvatarWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  background: #e0e7ef;
`;

const AvatarOverlay = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  gap: 0.5rem;
`;

const OverlayButton = styled.button`
  background: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #e0e7ef;
  }
`;

const ProfileInfo = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ProfileName = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #4a6cf7;
  margin-bottom: 0.25rem;
`;

const ProfileEmail = styled.div`
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 1.25rem;
`;

const LogoutButton = styled(Button)`
  margin-top: 0.5rem;
`;

const EditCard = styled(Card)`
  flex: 1;
  min-width: 320px;
  background: #fff;
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.08);
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PasswordButton = styled(Button)`
  align-self: flex-start;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.18);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalCard = styled(Card)`
  min-width: 340px;
  max-width: 95vw;
  background: #fff;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  padding: 2rem 1.5rem;
  position: relative;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  &:hover {
    color: #4a6cf7;
  }
`;

const ForgotLink = styled.a`
  color: #4a6cf7;
  font-size: 0.95rem;
  margin-left: 0.5rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const mockUserImg = 'https://api.dicebear.com/7.x/identicon/svg?seed=user';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { resetTheme } = useTheme();
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState<string>(mockUserImg);
  const [username, setUsername] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock update handlers
  const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProfileImg(url);
      setAlert({ type: 'success', message: 'Profile picture updated (mock)!' });
    }
  };
  const handleProfileImgRemove = () => {
    setProfileImg(mockUserImg);
    setAlert({ type: 'success', message: 'Profile picture removed (mock)!' });
  };
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAlert({ type: 'success', message: 'Profile updated (mock)!' });
    }, 1200);
  };
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPasswordModal(false);
      setAlert({ type: 'success', message: 'Password updated (mock)!' });
      setOldPassword('');
      setNewPassword('');
    }, 1200);
  };


  // Mock data for additional sections
  const activitySummary = [
    { label: 'Notes Created', value: 42, icon: <FiEdit2 /> },
    { label: 'Current Streak', value: 7, icon: <FiKey /> },
    { label: 'Last Login', value: '2025-09-04 21:10', icon: <FiLogOut /> },
  ];
  const recentLogins = [
    '2025-09-04 21:10',
    '2025-09-03 19:45',
    '2025-09-02 08:22',
  ];
  const quote = {
    text: 'Success is the sum of small efforts, repeated day in and day out.',
    author: 'Robert Collier',
  };

  return (<>
  <Header />
    <PageBackground>
      <Container>
        <EditCard elevation="medium" borderRadius="large" fullWidth>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 24, color: '#222' }}>Edit Profile</h2>
          <EditForm onSubmit={handleProfileUpdate}>
            <Input
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              leftIcon={<FiUser />}
              required
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              leftIcon={<FiMail />}
              required
            />
            <PasswordButton
              type="button"
              variant="outline"
              leftIcon={<FiKey />}
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </PasswordButton>
            <Button type="submit" variant="primary" isLoading={loading} style={{ marginTop: 8 }}>
              Update Profile
            </Button>
          </EditForm>

          {/* Activity summary section */}
          <div style={{ marginTop: 32 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16, color: '#4a6cf7' }}>Activity Summary</h3>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {activitySummary.map((item, idx) => (
                <div key={idx} style={{
                  background: '#f1f5fd',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px rgba(74,108,247,0.07)',
                  padding: '1rem 1.5rem',
                  minWidth: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 500,
                  color: '#222',
                  fontSize: 16,
                }}>
                  <span style={{ color: '#4a6cf7', fontSize: 22, marginBottom: 4 }}>{item.icon}</span>
                  <span style={{ fontSize: 22, fontWeight: 700 }}>{item.value}</span>
                  <span style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Motivational quote */}
          <div style={{ marginTop: 36, background: '#f3f6fd', borderRadius: 10, padding: '1.25rem 1rem', boxShadow: '0 2px 8px rgba(74,108,247,0.06)' }}>
            <span style={{ fontSize: 18, color: '#4a6cf7', fontStyle: 'italic' }}>
              “{quote.text}”
            </span>
            <div style={{ fontSize: 14, color: '#6b7280', marginTop: 6, textAlign: 'right' }}>- {quote.author}</div>
          </div>
        </EditCard>

        <ProfileCard elevation="high" borderRadius="large">
          <AvatarWrapper>
            <Avatar src={profileImg} alt="Profile" />
            <AvatarOverlay>
              <OverlayButton as="label" title="Upload">
                <FiCamera />
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleProfileImgChange} />
              </OverlayButton>
              <OverlayButton title="Remove" onClick={handleProfileImgRemove}>
                <FiTrash2 />
              </OverlayButton>
            </AvatarOverlay>
          </AvatarWrapper>
          <ProfileInfo>
            <ProfileName>{user?.fullName || 'User'}</ProfileName>
            <ProfileEmail>{user?.email || 'user@email.com'}</ProfileEmail>
          </ProfileInfo>
          <LogoutButton
            variant="danger"
            leftIcon={<FiLogOut />}
            onClick={() => {
              logout();
              resetTheme();
              navigate('/landing');
            }}
            fullWidth
          >
            Logout
          </LogoutButton>

          {/* Recent logins section */}
          <div style={{ marginTop: 32, width: '100%' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 10, color: '#4a6cf7', textAlign: 'center' }}>Recent Logins</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {recentLogins.map((login, idx) => (
                <li key={idx} style={{
                  background: '#f1f5fd',
                  borderRadius: 8,
                  marginBottom: 6,
                  padding: '0.5rem 0.75rem',
                  fontSize: 14,
                  color: '#222',
                  textAlign: 'center',
                  boxShadow: '0 1px 4px rgba(74,108,247,0.04)',
                }}>{login}</li>
              ))}
            </ul>
          </div>
        </ProfileCard>

        {showPasswordModal && (
          <ModalOverlay>
            <ModalCard elevation="high" borderRadius="large">
              <ModalClose onClick={() => setShowPasswordModal(false)}>&times;</ModalClose>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 18 }}>Change Password</h3>
              <form onSubmit={handlePasswordUpdate}>
                <Input
                  label="Old Password"
                  type="password"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  leftIcon={<FiKey />}
                  required
                />
                <Input
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  leftIcon={<FiKey />}
                  required
                />
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                  <Button type="submit" variant="primary" isLoading={loading} style={{ minWidth: 120 }}>
                    Update
                  </Button>
                  <ForgotLink href="/forgot-password">Forgot password?</ForgotLink>
                </div>
              </form>
            </ModalCard>
          </ModalOverlay>
        )}

        {alert && (
          <Alert
            variant={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            autoClose
          />
        )}
      </Container>
    </PageBackground>
    </>
  );
};

export default ProfilePage;

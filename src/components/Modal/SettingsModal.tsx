import React, { useState } from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import type { User } from '../../types';

const Section = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 14px;
  box-shadow: 0 6px 18px rgba(16,24,40,0.04);
  margin-bottom: 12px;
  border: 1px solid #f1f3f8;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.div`
  font-size: 13px;
  color: #223;
  font-weight: 600;
`;

const Small = styled.div`
  font-size: 12px;
  color: #667;
  margin-top: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e6e9ef;
  background: #fff;
  font-size: 14px;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button<{ variant?: 'primary' | 'danger' | 'ghost' }>`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: ${(p) => (p.variant === 'primary' ? '#3b82f6' : p.variant === 'danger' ? '#ef4444' : 'transparent')};
  color: ${(p) => (p.variant === 'primary' || p.variant === 'danger' ? '#fff' : '#334')};
  box-shadow: ${(p) => (p.variant === 'primary' ? '0 6px 14px rgba(59,130,246,0.18)' : 'none')};
  border: ${(p) => (p.variant === 'ghost' ? '1px solid #e6e9ef' : 'none')};
`;

const DangerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface Props {
  open: boolean;
  onClose: () => void;
  user: User;
  onSave?: (u: Partial<User>) => void;
}

const SettingsModal: React.FC<Props> = ({ open, onClose, user, onSave }) => {
  const [username, setUsername] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarRemoved, setAvatarRemoved] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSave = () => {
    onSave && onSave({ name: username, email });
    onClose();
    alert('Profile updated (demo)');
  };

  return (
    <Modal open={open} onClose={onClose} title="User Settings" width="760px">
      <div style={{ display: 'flex', gap: 18 }}>
        <div style={{ flex: 1 }}>
          <Section>
            <Label>Profile</Label>
            <Small>Update your display name and avatar. Current: <strong style={{ marginLeft: 6 }}>{user.name}</strong></Small>
            <div style={{ marginTop: 10 }}>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Display name" />
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
              <Button onClick={() => { setAvatarRemoved(false); alert('Change avatar (demo)'); }} variant="ghost">Upload</Button>
              <Button onClick={() => { setAvatarRemoved(true); alert('Avatar removed (demo)'); }} variant="ghost">Remove avatar</Button>
            </div>
          </Section>

          <Section>
            <Label>Email</Label>
            <Small>Primary email address</Small>
            <div style={{ marginTop: 8 }}>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </Section>

          <Section>
            <Label>Phone</Label>
            <Small>Attach or update phone contact for recovery and 2FA</Small>
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 555-5555" />
              <Button variant="primary" onClick={() => alert('Save phone (demo)')}>Save</Button>
            </div>
          </Section>

          <Section>
            <Label>Work Email</Label>
            <Small>Optional: company or organization email</Small>
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <Input value={workEmail} onChange={(e) => setWorkEmail(e.target.value)} placeholder="you@work.com" />
              <Button variant="primary" onClick={() => alert('Save work email (demo)')}>Save</Button>
            </div>
          </Section>

          <Section>
            <Row>
              <div>
                <Label>Notifications</Label>
                <Small>Clear all notifications</Small>
              </div>
              <ActionGroup>
                <Button variant="ghost" onClick={() => alert('Notifications cleared (demo)')}>Clear</Button>
              </ActionGroup>
            </Row>
          </Section>

        </div>

        <div style={{ width: 320 }}>
          <Section>
            <Label>Security</Label>
            <Small>Change your password</Small>
            <div style={{ marginTop: 10 }}>
              <Button variant="ghost" onClick={() => setShowPassword((s) => !s)}>{showPassword ? 'Hide' : 'Change password'}</Button>
            </div>

            {showPassword && (
              <div style={{ marginTop: 10 }}>
                <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Old password" style={{ marginBottom: 8 }} />
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" />
                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button variant="primary" onClick={() => { alert('Password updated (demo)'); setShowPassword(false); }}>Update</Button>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Open forgot password flow (demo)'); }} style={{ color: '#3b82f6', fontSize: 13 }}>Forgot password?</a>
                </div>
              </div>
            )}
          </Section>

          <Section>
            <Label>Maintenance</Label>
            <Small>Manage app storage and data</Small>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button variant="ghost" onClick={() => alert('Recycle bin cleared (demo)')}>Clear Recycle Bin</Button>
              <Button variant="ghost" onClick={() => alert('Cache cleared (demo)')}>Clear Cached Data</Button>
            </div>
          </Section>

          <Section>
            <Label>Account Actions</Label>
            <Small>Sign out, deactivate, or delete your account</Small>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button variant="ghost" onClick={() => alert('Logging out (demo)')}>Logout</Button>
              <Button variant="danger" onClick={() => { if (confirm('Delete account? This is irreversible (demo).')) { alert('Account deleted (demo)'); } }}>Delete Account</Button>
              <Button variant="ghost" onClick={() => { if (confirm('Suspend account? (demo)')) { alert('Account suspended (demo)'); } }}>Deactivate / Suspend</Button>
            </div>
          </Section>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 14 }}>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save changes</Button>
      </div>
    </Modal>
  );
};

export default SettingsModal;

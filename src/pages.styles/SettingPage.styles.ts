import styled from 'styled-components';
// import { device } from '../styles/breakpoints';

// Main container
export const SettingPageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
  
  .dark & {
    background: linear-gradient(120deg, #0f172a 0%, #1a1f35 100%);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 25% 25%, rgba(74,108,247,0.2), transparent 30%),
                radial-gradient(circle at 75% 75%, rgba(34,211,238,0.2), transparent 30%),
                radial-gradient(circle at 50% 50%, rgba(167,139,250,0.15), transparent 40%);
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(60px);
    animation: floatBg 25s ease-in-out infinite alternate;
    z-index: 0;
  }
  
  .dark &::before {
    background: radial-gradient(circle at 25% 25%, rgba(99,102,241,0.25), transparent 30%),
                radial-gradient(circle at 75% 75%, rgba(79,70,229,0.2), transparent 30%),
                radial-gradient(circle at 50% 50%, rgba(167,139,250,0.15), transparent 40%);
  }

  @keyframes floatBg {
    0% { transform: translate(0px, 0px) rotate(0deg); }
    25% { transform: translate(20px, -30px) rotate(20deg); }
    50% { transform: translate(-20px, 40px) rotate(-10deg); }
    75% { transform: translate(30px, -20px) rotate(10deg); }
    100% { transform: translate(0px, 0px) rotate(0deg); }
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;


// Left section (Profile)
export const LeftSection = styled.div`
  flex: 1;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem;
  background: #ffffffcc;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  
  .dark & {
    background: #1e293bcc;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  }
`;

export const SectionHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #0f172a;
  
  .dark & {
    color: #f1f5f9;
  }
`;

// Profile Wrapper
export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

// Avatar image
export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #4a6cf7;
  
  .dark & {
    border: 4px solid #6366f1;
  }
`;

// User info
export const UserName = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  
  .dark & {
    color: #f1f5f9;
  }
`;

export const UserEmail = styled.div`
  font-size: 1rem;
  color: #555;
  
  .dark & {
    color: #cbd5e1;
  }
`;

export const UserJoined = styled.div`
  font-size: 0.85rem;
  color: #888;
  
  .dark & {
    color: #94a3b8;
  }
`;

// Sign Out wrapper
export const SignOutWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

// Right section (Settings)
export const RightSection = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

// Settings grid content
export const SettingsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; // 2 columns
  grid-template-rows: repeat(3, 1fr); // 3 rows
  gap: 2rem;
  width: 100%;
  height: 100%;
`;

// Individual setting row
export const SettingRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  
  .dark & {
    background: #1e293b;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }
`;

// Button for settings
export const SettingButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  background: #4a6cf7;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #3a5ce5;
    transform: translateY(-1px);
  }
  
  .dark & {
    background: #6366f1;
  }
  
  .dark &:hover {
    background: #4f46e5;
    transform: translateY(-1px);
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1rem;
  border-radius: 12px;
  background-color: #f0f4ff;
  transition: all 0.25s ease-in-out;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  
  .dark & {
    background-color: #1e293b;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover ${UserInfo} {
    transform: scale(1.03);
    background-color: #e0ebff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .dark &:hover ${UserInfo} {
    background-color: #334155;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  }
`;

export const TopRightAction = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;
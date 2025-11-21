import styled from 'styled-components';
// import { device } from '../styles/breakpoints';

// Main container
export const SettingPageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  position: relative; /* needed for ::before positioning */
  overflow: hidden;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);

  /* Subtle moving gradient dots */
  /* Animated gradient blobs in background */
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

@keyframes floatBg {
  0% { transform: translate(0px, 0px) rotate(0deg); }
  25% { transform: translate(20px, -30px) rotate(20deg); }
  50% { transform: translate(-20px, 40px) rotate(-10deg); }
  75% { transform: translate(30px, -20px) rotate(10deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
}

/* Make content above background */
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
  justify-content: space-between; // push sign out to bottom
  align-items: center;
  padding: 2rem 1rem;
  background: #ffffffcc;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
`;

// Section Header
export const SectionHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
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
`;

// User info
export const UserName = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const UserEmail = styled.div`
  font-size: 1rem;
  color: #555;
`;

export const UserJoined = styled.div`
  font-size: 0.85rem;
  color: #888;
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
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1rem;
  border-radius: 12px;
  background-color: #f0f4ff; // subtle default background
  transition: all 0.25s ease-in-out;
  
  /* Optional: add shadow to make it pop */
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  /* When a child button is hovered, animate the UserInfo panel */
  &:hover ${UserInfo} {
    transform: scale(1.03);
    background-color: #e0ebff; // lighter highlight
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;
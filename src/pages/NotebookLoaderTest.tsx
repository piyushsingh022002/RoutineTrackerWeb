import React from 'react';
import styled, { keyframes } from 'styled-components';

/* ---------- Animations ---------- */

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(80px);
  }
  100% {
    transform: translateY(0);
  }
`;

const colorShift = keyframes`
  0% {
    background-color: #4f7cff;
  }
  50% {
    background-color: #7aa2ff;
  }
  100% {
    background-color: #4f7cff;
  }
`;

const shadowPulse = keyframes`
  0% {
    transform: scale(0.6);
    opacity: 0.2;
  }
  50% {
    transform: scale(1);
    opacity: 0.35;
  }
  100% {
    transform: scale(0.6);
    opacity: 0.2;
  }
`;

/* ---------- Wrapper ---------- */

const LoaderWrapper = styled.div`
  width: 120px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

/* ---------- Ball ---------- */

const Ball = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  animation:
    ${bounce} 1.4s ease-in-out infinite,
    ${colorShift} 3s ease-in-out infinite;
  box-shadow: 0 8px 20px rgba(79, 124, 255, 0.35);
`;

/* ---------- Shadow ---------- */

const Shadow = styled.div`
  margin-top: 70px;
  width: 36px;
  height: 8px;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.35),
    transparent
  );
  border-radius: 50%;
  animation: ${shadowPulse} 1.4s ease-in-out infinite;
`;

/* ---------- Component ---------- */

const NotebookLoaderTest: React.FC = () => {
  return (
    <LoaderWrapper>
      <Ball />
      <Shadow />
    </LoaderWrapper>
  );
};

export default NotebookLoaderTest;

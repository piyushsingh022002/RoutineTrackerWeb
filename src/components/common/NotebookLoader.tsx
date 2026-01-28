import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

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

const shimmer = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
`;

const LoaderContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  padding: 1.5rem 2rem;
  gap: 1.5rem;
`;

const BallWrapper = styled.div`
  width: 120px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Ball = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  animation:
    ${bounce} 1.4s ease-in-out infinite,
    ${colorShift} 3s ease-in-out infinite;
  box-shadow: 0 8px 20px rgba(79, 124, 255, 0.35);
`;

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

const LoadingText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #4a6cf7;
  text-align: center;
  letter-spacing: 0.5px;
  font-family: 'Georgia', 'Garamond', serif;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

const LoadingSubtext = styled.div`
  font-size: 0.75rem;
  color: #6c757d;
  text-align: center;
  margin-top: -0.5rem;
`;

const DotsWrapper = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
`;

const Dot = styled.div<{ delay: number }>`
  width: 6px;
  height: 6px;
  background: #4a6cf7;
  border-radius: 50%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

interface NotebookLoaderProps {
  message?: string;
  subtext?: string;
}

const NotebookLoader: React.FC<NotebookLoaderProps> = ({ 
  message = "Please wait, shortly",
  subtext = "Processing your request"
}) => {
  return (
    <LoaderContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <BallWrapper>
        <Ball />
        <Shadow />
      </BallWrapper>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <LoadingText>{message}</LoadingText>
        <DotsWrapper>
          <Dot delay={0} />
          <Dot delay={0.2} />
          <Dot delay={0.4} />
        </DotsWrapper>
      </div>
      
      <LoadingSubtext>{subtext}</LoadingSubtext>
    </LoaderContainer>
  );
};

export default NotebookLoader;

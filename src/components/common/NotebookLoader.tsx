import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const writeAnimation = keyframes`
  0%, 100% {
    transform: translate(0, 0) rotate(-45deg);
  }
  25% {
    transform: translate(5px, -5px) rotate(-45deg);
  }
  50% {
    transform: translate(10px, 0) rotate(-45deg);
  }
  75% {
    transform: translate(5px, 5px) rotate(-45deg);
  }
`;

const pageFlip = keyframes`
  0%, 100% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(10deg);
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
  padding: 3rem;
  gap: 2rem;
`;

const NotebookWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 220px;
  perspective: 1000px;
`;

const Notebook = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #ffffff, #f5f5f5);
  border-radius: 8px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  animation: ${pageFlip} 3s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, 
      transparent 0%, 
      #e74c3c 10%, 
      #e74c3c 90%, 
      transparent 100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 12px;
    left: 8px;
    right: 8px;
    bottom: 12px;
    background: repeating-linear-gradient(
      transparent,
      transparent 25px,
      #e0e0e0 25px,
      #e0e0e0 26px
    );
    border-radius: 4px;
  }
`;

const NotebookSpiral = styled.div`
  position: absolute;
  left: -8px;
  top: 15px;
  bottom: 15px;
  width: 16px;
  background: linear-gradient(to bottom, #333 0%, #555 100%);
  border-radius: 8px;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    2px 0 4px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 8px,
      rgba(0, 0, 0, 0.3) 8px,
      rgba(0, 0, 0, 0.3) 10px
    );
  }
`;

const PencilWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 15px;
  width: 80px;
  height: 80px;
  animation: ${writeAnimation} 2s ease-in-out infinite;
  z-index: 10;
`;

const Pencil = styled.div`
  position: relative;
  width: 8px;
  height: 70px;
  background: linear-gradient(to bottom, 
    #ffd700 0%, 
    #ffed4e 40%, 
    #ffed4e 70%, 
    #ff6b6b 70%, 
    #ff6b6b 75%, 
    #333 75%, 
    #333 100%
  );
  border-radius: 4px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 8px solid #333;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 2px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 1px;
  }
`;

const PencilEraser = styled.div`
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 8px;
  background: #ff6b6b;
  border-radius: 2px;
  border-top: 2px solid #c92a2a;
`;

const LoadingText = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
  color: #4a6cf7;
  text-align: center;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

const LoadingSubtext = styled.div`
  font-size: 0.875rem;
  color: #6c757d;
  text-align: center;
  margin-top: -1rem;
`;

const DotsWrapper = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
`;

const Dot = styled.div<{ delay: number }>`
  width: 8px;
  height: 8px;
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
  message = "Processing",
  subtext = "Please wait while we handle your request"
}) => {
  return (
    <LoaderContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <NotebookWrapper>
        <NotebookSpiral />
        <Notebook />
        <PencilWrapper>
          <PencilEraser />
          <Pencil />
        </PencilWrapper>
      </NotebookWrapper>
      
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

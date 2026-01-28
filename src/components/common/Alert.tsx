import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
  showIcon?: boolean;
}

const getAlertColor = (variant: AlertVariant) => {
  switch (variant) {
    case 'success':
      return {
        bg: '#d4edda',
        border: '#c3e6cb',
        text: '#155724',
        icon: '✓',
      };
    case 'error':
      return {
        bg: '#f8d7da',
        border: '#f5c6cb',
        text: '#721c24',
        icon: '',
      };
    case 'warning':
      return {
        bg: '#fff3cd',
        border: '#ffeeba',
        text: '#856404',
        icon: '⚠',
      };
    case 'info':
      return {
        bg: '#d1ecf1',
        border: '#bee5eb',
        text: '#0c5460',
        icon: 'ℹ',
      };
    default:
      return {
        bg: '#d1ecf1',
        border: '#bee5eb',
        text: '#0c5460',
        icon: 'ℹ',
      };
  }
};

const AlertContainer = styled(motion.div)<{ $variant: AlertVariant }>`
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  box-shadow: ${(props) => props.$variant === 'error' ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none'};
  border-width: ${(props) => props.$variant === 'error' ? '2px' : '1px'};
  border-style: solid;
  
  background-color: ${(props) => getAlertColor(props.$variant).bg};
  border-color: ${(props) => getAlertColor(props.$variant).border};
  color: ${(props) => getAlertColor(props.$variant).text};
  
  ${(props) => props.$variant === 'error' && `
    animation: shake 0.5s ease-in-out;
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
  `}
`;

const IconContainer = styled.div`
  margin-right: 0.75rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const AlertTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const AlertMessage = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
  color: inherit;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  message,
  onClose,
  autoClose = false,
  autoCloseTime = 5000,
  showIcon = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          setTimeout(onClose, 300); // Call onClose after exit animation
        }
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 300); // Call onClose after exit animation
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <AlertContainer
          $variant={variant}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {showIcon && (
            <IconContainer>{getAlertColor(variant).icon}</IconContainer>
          )}
          <ContentContainer>
            {title && <AlertTitle>{title}</AlertTitle>}
            <AlertMessage>{message}</AlertMessage>
          </ContentContainer>
          {onClose && (
            <CloseButton onClick={handleClose}>×</CloseButton>
          )}
        </AlertContainer>
      )}
    </AnimatePresence>
  );
};

export default Alert;

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
  elevation?: 'low' | 'medium' | 'high';
  padding?: 'small' | 'medium' | 'large';
  borderRadius?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  className?: string;
}

const getElevation = (elevation: 'low' | 'medium' | 'high') => {
  switch (elevation) {
    case 'low':
      return '0 2px 5px rgba(0, 0, 0, 0.1)';
    case 'medium':
      return '0 4px 10px rgba(0, 0, 0, 0.1)';
    case 'high':
      return '0 8px 20px rgba(0, 0, 0, 0.15)';
    default:
      return '0 4px 10px rgba(0, 0, 0, 0.1)';
  }
};

const getPadding = (padding: 'small' | 'medium' | 'large') => {
  switch (padding) {
    case 'small':
      return '0.75rem';
    case 'medium':
      return '1.25rem';
    case 'large':
      return '2rem';
    default:
      return '1.25rem';
  }
};

const getBorderRadius = (borderRadius: 'small' | 'medium' | 'large') => {
  switch (borderRadius) {
    case 'small':
      return '4px';
    case 'medium':
      return '8px';
    case 'large':
      return '12px';
    default:
      return '8px';
  }
};

import { device } from '../../styles/breakpoints';
const StyledCard = styled(motion.div)<{
  $hoverable: boolean;
  $elevation: 'low' | 'medium' | 'high';
  $padding: 'small' | 'medium' | 'large';
  $borderRadius: 'small' | 'medium' | 'large';
  $fullWidth: boolean;
  $clickable: boolean;
}>`
  background-color: var(--bg-light);
  box-shadow: ${(props) => getElevation(props.$elevation)};
  border-radius: ${(props) => getBorderRadius(props.$borderRadius)};
  padding: ${(props) => getPadding(props.$padding)};
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  transition: box-shadow 220ms var(--easing-in-out), transform 220ms var(--easing-in-out), background-color 220ms var(--easing-in-out), color 220ms var(--easing-in-out);
  cursor: ${(props) => (props.$clickable ? 'pointer' : 'default')};
  box-sizing: border-box;

  @media ${device.tablet} {
    padding: 1rem;
  }
  @media ${device.mobile} {
    padding: 0.5rem;
  }

  &:hover {
    box-shadow: ${(props) => props.$hoverable ? getElevation('high') : getElevation(props.$elevation)};
    transform: ${(props) => props.$hoverable ? 'translateY(-2px)' : 'none'};
  }
`;

const Card: React.FC<CardProps> = ({
  children,
  onClick,
  hoverable = false,
  elevation = 'medium',
  padding = 'medium',
  borderRadius = 'medium',
  fullWidth = false,
  className,
}) => {
  return (
    <StyledCard
      $hoverable={hoverable}
      $elevation={elevation}
      $padding={padding}
      $borderRadius={borderRadius}
      $fullWidth={fullWidth}
      $clickable={!!onClick}
      onClick={onClick}
      className={className}
  whileHover={hoverable ? { scale: 1.01 } : {}}
  whileTap={onClick ? { scale: 0.99 } : {}}
    >
      {children}
    </StyledCard>
  );
};

export default Card;

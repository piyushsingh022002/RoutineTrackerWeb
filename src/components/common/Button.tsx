import React from "react";
import styled from "styled-components";
// import type { MotionProps } from "framer-motion";
// import { FixMotionButton } from "./FixMotionButton";


type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "outline";
type ButtonSize = "small" | "medium" | "large";
type ButtonShape = "rounded" | "pill";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shape?: ButtonShape;
}

const getButtonColor = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return {
        bg: "#4a6cf7",
        hover: "#3a5ce5",
        text: "#ffffff",
      };
    case "secondary":
      return {
        bg: "#6c757d",
        hover: "#5a6268",
        text: "#ffffff",
      };
    case "danger":
      return {
        bg: "#dc3545",
        hover: "#c82333",
        text: "#ffffff",
      };
    case "success":
      return {
        bg: "#28a745",
        hover: "#218838",
        text: "#ffffff",
      };
    case "outline":
      return {
  bg: "transparent",
  hover: "rgba(74,108,247,0.1)",
  text: "#4a6cf7",
  border: "#4a6cf7",
      };
    default:
      return {
        bg: "#4a6cf7",
        hover: "#3a5ce5",
        text: "#ffffff",
      };
  }
};

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case "small":
      return {
  padding: "0.375rem 0.75rem",
  fontSize: "0.9rem",
  minHeight: "34px",
      };
    case "medium":
      return {
  padding: "0.6rem 1rem",
  fontSize: "1rem",
  minHeight: "40px",
      };
    case "large":
      return {
  padding: "0.85rem 1.3rem",
  fontSize: "1.05rem",
  minHeight: "46px",
      };
    default:
      return {
  padding: "0.6rem 1rem",
  fontSize: "1rem",
  minHeight: "40px",
      };
  }
};

// const StyledButton = styled(FixMotionButton)<
//   {
//     $variant: ButtonVariant;
//     $size: ButtonSize;
//     $fullWidth: boolean;
//   } & MotionProps
// >`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   border-radius: 4px;
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.2s ease;
//   width: ${(props) => (props.$fullWidth ? "100%" : "auto")};

//   background-color: ${(props) => getButtonColor(props.$variant).bg};
//   color: ${(props) => getButtonColor(props.$variant).text};
//   border: ${(props) =>
//     getButtonColor(props.$variant).border
//       ? `1px solid ${getButtonColor(props.$variant).border}`
//       : "none"};

//   padding: ${(props) => getButtonSize(props.$size).padding};
//   font-size: ${(props) => getButtonSize(props.$size).fontSize};

//   &:hover:not(:disabled) {
//     background-color: ${(props) => getButtonColor(props.$variant).hover};
//   }

//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }
// `;
import { device } from '../../styles/breakpoints';
const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $shape: ButtonShape;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: ${(p) => (p.$shape === 'pill' ? '9999px' : '10px')};
  font-weight: 550;
  letter-spacing: 0.01em;

  cursor: pointer;
  transition: transform 160ms var(--easing-out), box-shadow 160ms var(--easing-out), background-color 160ms var(--easing-out), color 160ms var(--easing-out), border-color 160ms var(--easing-out);
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  background-color: ${(props) => getButtonColor(props.$variant).bg};
  color: ${(props) => getButtonColor(props.$variant).text};
  border: ${(props) =>
    getButtonColor(props.$variant).border
      ? `1px solid ${getButtonColor(props.$variant).border}`
      : 'none'};
  padding: ${(props) => getButtonSize(props.$size).padding};
  font-size: ${(props) => getButtonSize(props.$size).fontSize};
  min-height: ${(props) => getButtonSize(props.$size).minHeight};
  @media ${device.tablet} {
    font-size: 0.95rem;
    padding: 0.5rem 0.9rem;
  }
  @media ${device.mobile} {
    font-size: 0.85rem;
    padding: 0.3rem 0.6rem;
  }
  outline: none;
  &:hover:not(:disabled) {
    background-color: ${(props) => getButtonColor(props.$variant).hover};
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  }
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  }
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(74,108,247,0.35), var(--shadow-md);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  shape = "rounded",
  disabled,
  ...rest
}) => {
  return (
      <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $shape={shape}
      disabled={disabled || isLoading}
      {...rest}  // ✅ no whileHover or whileTap
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {leftIcon && leftIcon}
          {children}
          {rightIcon && rightIcon}
        </>
      )}
    </StyledButton>
  );
};

export default Button;

import styled from "styled-components";

interface ModalContainerProps {
  width?: string;
}

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2147483647;
`;

export const ModalContainer = styled.div<ModalContainerProps>`
  background: #fff;
  width: ${({ width }) => width || "420px"};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.22s ease-out;
  
  .dark & {
    background: #1e293b;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ModalHeader = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #0f172a;
  
  .dark & {
    color: #f1f5f9;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 1.5rem;
`;

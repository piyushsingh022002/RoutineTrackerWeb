import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalFooter,
} from './Modal.styles';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  footer?: React.ReactNode; // custom footer (buttons)
  closeOnOverlayClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  width,
  footer,
  closeOnOverlayClick = true,
}) => {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const modal = (
    <Overlay onClick={closeOnOverlayClick ? onClose : undefined}>
      <ModalContainer width={width} onClick={(e) => e.stopPropagation()}>
        {title && <ModalHeader>{title}</ModalHeader>}

        <div>{children}</div>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContainer>
    </Overlay>
  );

  // Render modal into document body to avoid parent stacking/transform issues
  return typeof document !== 'undefined' ? createPortal(modal, document.body) : null;
};

export default Modal;

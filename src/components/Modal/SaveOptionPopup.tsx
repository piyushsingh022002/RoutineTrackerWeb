import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../common/Button';

export type OperationType = 'download' | 'import';

interface SaveOptionPopupProps {
  open: boolean;
  operation: OperationType;
  onClose: () => void;
  onSelect: (options: {
    saveOption: 'SAVE' | 'No';
    externalEmail?: string;
    sendToSelf: boolean;
  }) => void;
}

const SaveOptionPopup: React.FC<SaveOptionPopupProps> = ({
  open,
  operation,
  onClose,
  onSelect,
}) => {
  const isDownload = operation === 'download';

  const [recipientType, setRecipientType] = useState<'self' | 'external'>('self');
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  if (!open) return null;

  const validateEmailIfNeeded = (): boolean => {
    if (isDownload) return true;
    if (recipientType === 'self') return true;

    const value = emailInput.trim();
    if (!value) {
      setEmailError('Please enter an email address');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const title = isDownload
    ? 'Download your note'
    : 'Import your notes safely';

  const description = isDownload
    ? 'Do you want to save this note in your account before downloading it?'
    : 'Do you want to save these notes in your account before importing them?';

  const primaryLabel = isDownload ? 'Save and Download' : 'Save and Import';
  const secondaryLabel = isDownload ? 'Download' : "Don't save, just import";

  const handlePrimary = () => {
    if (!validateEmailIfNeeded()) return;

    onSelect({
      saveOption: 'SAVE',
      externalEmail: !isDownload && recipientType === 'external' ? emailInput.trim() : undefined,
      sendToSelf: !isDownload && recipientType === 'self',
    });
    onClose();
  };

  const handleSecondary = () => {
    if (!validateEmailIfNeeded()) return;

    onSelect({
      saveOption: 'No',
      externalEmail: !isDownload && recipientType === 'external' ? emailInput.trim() : undefined,
      sendToSelf: !isDownload && recipientType === 'self',
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      width="420px"
      footer={(
        <>
          <Button
            variant="secondary"
            size="small"
            shape="pill"
            onClick={handleSecondary}
          >
            {secondaryLabel}
          </Button>
          <Button
            variant="primary"
            size="small"
            shape="pill"
            onClick={handlePrimary}
          >
            {primaryLabel}
          </Button>
        </>
      )}
    >
      <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.5 }}>
        {description}
      </p>
      {!isDownload && (
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', color: '#4b5563' }}>
            Send imported note to:
          </label>
          <select
            value={recipientType}
            onChange={(e) => {
              setRecipientType(e.target.value as 'self' | 'external');
              setEmailError(null);
            }}
            style={{
              padding: '0.45rem 0.6rem',
              borderRadius: 8,
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
            }}
          >
            <option value="self">My own email</option>
            <option value="external">External email</option>
          </select>

          {recipientType === 'external' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <input
                type="email"
                placeholder="Enter external email address"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  if (emailError) setEmailError(null);
                }}
                style={{
                  padding: '0.45rem 0.6rem',
                  borderRadius: 8,
                  border: '1px solid #d1d5db',
                  fontSize: '0.9rem',
                }}
              />
              {emailError && (
                <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>{emailError}</span>
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default SaveOptionPopup;

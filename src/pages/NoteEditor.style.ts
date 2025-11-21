import styled from 'styled-components';
import { motion } from 'framer-motion';
import { device } from '../styles/breakpoints';

// Dialog overlay for showing saved note
const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.18);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
`;

const DialogBox = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(74,108,247,0.13);
  padding: 32px;
  min-width: 320px;
  max-width: 420px;
  width: 100%;
  position: relative;
`;

const DialogClose = styled.button`
  position: absolute;
  top: 12px;
  right: 18px;
  background: none;
  border: none;
  font-size: 24px;
  color: #4a6cf7;
  cursor: pointer;
`;

const EditorCard = styled(motion.div)<{ isCancelHovered: boolean; isSaveHovered: boolean; $inline?: boolean }>`
  background: ${(p) => (p.$inline ? 'transparent' : 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%) fixed, radial-gradient(ellipse 80% 60% at 60% 0%, #e0e7ff33 0%, #f8fafc00 100%) fixed')};
  border-radius: ${(p) => (p.$inline ? '0' : '0')};
  box-shadow: none;
  width: ${(p) => (p.$inline ? '100%' : '100vw')};
  height: ${(p) => (p.$inline ? 'auto' : '100%')};
  margin: 0;
  padding: ${(p) => (p.$inline ? '0' : '0')};
  transition: border 0.3s, box-shadow 0.3s;
  border: none;
  @media ${device.mobile} {
    padding: ${(p) => (p.$inline ? '0' : '1.25rem 0.5rem')};
  }
`;

const EditorContainer = styled.div<{ $inline?: boolean }>`
  ${(p) =>
    p.$inline
      ? `position: relative; top: auto; left: auto; width: 100%; height: auto; min-width: 0; background: transparent; box-sizing: border-box; display: flex; flex-direction: column; align-items: stretch; justify-content: stretch;`
      : `position: fixed; top: var(--header-height, 88px); left: 0; width: 100vw; height: calc(100vh - var(--header-height, 88px)); min-height: 0; min-width: 100vw; background: transparent; box-sizing: border-box; z-index: 1; display: flex; flex-direction: column; align-items: stretch; justify-content: stretch;`}
`;

const Content = styled.main<{ $inline?: boolean }>`
  width: ${(p) => (p.$inline ? '100%' : '100vw')};
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2.5rem;
  padding: 0 0 0 0;
  box-sizing: border-box;
  @media ${device.tablet} {
    flex-direction: column;
    gap: 1.5rem;
    width: ${(p) => (p.$inline ? '100%' : '100vw')};
    padding: 0;
  }
  height: ${(p) => (p.$inline ? 'auto' : '100%')};
  align-items: stretch;
  justify-content: center;
  padding: 0;
`;

export const LeftColumn = styled.div`
  flex: 2 1 0;
  min-width: 0;
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media ${device.tablet} {
    padding: 1.25rem 0.5rem;
  }
`;

export const RightColumn = styled.div`
  flex: 1 1 320px;
  min-width: 320px;
  max-width: 420px;
  padding: 2.5rem 2rem 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media ${device.tablet} {
    max-width: 100vw;
    min-width: 0;
    padding: 1.25rem 0.5rem;
  }
`;



const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

// Move Button definition above its usages
const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  border: none;
`;

const PrimaryButton = styled(Button)`
  background-color: var(--primary-color);
  color: white;
  &:hover {
    background-color: var(--primary-hover);
  }
  &:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
  }
  svg {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover svg {
    opacity: 1;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: var(--text-light);
  border: 1px solid var(--border-color);
  &:hover {
    background-color: var(--bg-color);
  }
  svg {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover svg {
    opacity: 1;
  }
`;

// Reverted Form to original styling (removed hover-related styles)
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  font-size: 0.875rem;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const EditorFieldWrap = styled(motion.div)`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
  background: var(--bg-light);
  &:focus-within { 
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
  /* Ensure CodeMirror editor text follows the page text color (useful for dark/semi-dark themes) */
  .cm-theme,
  .cm-editor,
  .cm-editor .cm-scroller,
  .cm-editor .cm-content,
  .cm-line {
    background: transparent;
    color: var(--text-color, #000);
    caret-color: var(--text-color, #000);
  }

  .cm-editor .cm-placeholder {
    color: rgba(255,255,255,0.65);
  }
`;

const TagsInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  min-height: 42px;
  transition: var(--transition);

  &:focus-within {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: rgba(79, 70, 229, 0.1);
  color: var(--primary-color);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
`;

const TagText = styled.span`
  font-weight: 500;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;

  &:hover {
    background-color: rgba(79, 70, 229, 0.2);
  }
`;

const TagInput = styled.input`
  flex: 1;
  min-width: 100px;
  border: none;
  outline: none;
  font-size: 0.875rem;
  padding: 0.25rem;
`;

const FileUploadContainer = styled.div`
  border: 2px dashed var(--border-color);
  border-radius: var(--radius);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    background-color: rgba(79, 70, 229, 0.05);
  }
`;

const FileUploadIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-light);
`;

const FileUploadText = styled.p`
  color: var(--text-light);
  margin-bottom: 0.5rem;
`;

const FileUploadSubtext = styled.p`
  font-size: 0.75rem;
  color: var(--text-light);
`;

const FileInput = styled.input`
  display: none;
`;

const FilePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const FilePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
`;

const FilePreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FilePreviewDocument = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(79, 70, 229, 0.1);
  color: var(--primary-color);
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  padding: 0.5rem;
`;

const RemoveFileButton = styled.button`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background-color: rgba(239, 68, 68, 0.8);
  color: white;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--danger-color);
  }
`;

const ErrorMessage = styled.div`
  color: var(--danger-color);
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const DownloadButton = styled(Button)`
  background-color: var(--secondary-color);
  color: white;
  &:hover {
    background-color: var(--secondary-hover);
  }
  svg {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover svg {
    opacity: 1;
  }
`;

// Links list styles
const LinksWrap = styled.div`
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  padding: 0.75rem;
  background: var(--bg-light);
`;

const LinkRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.4fr auto;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SmallRemove = styled.button`
  background: var(--danger-color);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
`;

export {
  DialogOverlay,
  DialogBox,
  DialogClose,
  EditorCard,
  EditorContainer,
  Content,
  ButtonGroup,
  Button,
  PrimaryButton,
  SecondaryButton,
  Form,
  FormGroup,
  Label,
  Input,
  EditorFieldWrap,
  TagsInput,
  Tag,
  TagText,
  RemoveTagButton,
  TagInput,
  FileUploadContainer,
  FileUploadIcon,
  FileUploadText,
  FileUploadSubtext,
  FileInput,
  FilePreviewContainer,
  FilePreview,
  FilePreviewImage,
  FilePreviewDocument,
  RemoveFileButton,
  ErrorMessage,
  DownloadButton,
  LinksWrap,
  LinkRow,
  SmallRemove,
};
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
  background: var(--overlay-scrim);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
`;

const DialogBox = styled.div`
  background: var(--modal-surface);
  border-radius: 16px;
  box-shadow: var(--modal-shadow);
  border: 1px solid var(--card-border-strong);
  padding: 32px;
  min-width: 320px;
  max-width: 420px;
  width: 100%;
  position: relative;
  color: var(--text-color);
`;

const DialogClose = styled.button`
  position: absolute;
  top: 12px;
  right: 18px;
  background: none;
  border: none;
  font-size: 24px;
  color: var(--primary-color);
  cursor: pointer;
`;

const EditorCard = styled(motion.div)<{ $inline?: boolean }>`
  width: min(1200px, 100%);
  margin: ${(p) => (p.$inline ? '0 auto' : '0 auto 2.5rem')};
  padding: ${(p) => (p.$inline ? '0' : '1.5rem 1rem 2rem')};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const FormGrid = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
  gap: 1.25rem;
  width: 100%;
  align-items: start;
  @media ${device.tablet} {
    grid-template-columns: 1fr;
  }
`;

const PrimaryColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const SidebarColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: sticky;
  top: calc(var(--header-height, 72px) + 1rem);
  @media ${device.tablet} {
    position: static;
  }
`;

const SectionCard = styled.section`
  background: var(--bg-light);
  border: 1px solid var(--card-border-strong);
  border-radius: 16px;
  box-shadow: var(--shadow);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0;
  font-weight: 700;
  color: var(--text-color);
`;

const SectionDescription = styled.p`
  font-size: 0.9rem;
  color: var(--text-light);
  margin: 0;
`;

const PreviewDialog = styled(DialogBox)`
  max-width: 640px;
  width: min(640px, 90vw);
`;

const PreviewHeading = styled.h2`
  font-size: 1.4rem;
  margin: 0 0 0.75rem;
  color: var(--text-color);
`;

const PreviewBody = styled.div`
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--bg-light);
  padding: 1rem;
  max-height: 60vh;
  overflow-y: auto;
  white-space: pre-wrap;
  line-height: 1.6;
  color: var(--text-color);
`;

const SelectControl = styled.select`
  width: 100%;
  padding: 0.65rem 0.75rem;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  transition: var(--transition);
  &:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const EditorContainer = styled.div<{ $inline?: boolean }>`
  width: 100%;
  min-height: ${(p) => (p.$inline ? 'auto' : '100vh')};
  padding: ${(p) => (p.$inline ? '0' : 'calc(var(--header-height, 88px) + 1.5rem) 1.25rem 3rem')};
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background:
    radial-gradient(900px 600px at 10% -5%, rgba(99,102,241,0.08), transparent 45%),
    radial-gradient(900px 600px at 90% -5%, rgba(14,165,233,0.08), transparent 50%),
    var(--bg-color);
`;

const Content = styled.main<{ $inline?: boolean }>`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: ${(p) => (p.$inline ? '1.5rem 1rem 2rem' : '0 0 2rem')};
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
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
    color: rgba(79,70,229,0.4);
    color: color-mix(in srgb, var(--text-light) 65%, transparent);
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
  background-color: rgba(79, 70, 229, 0.12);
  background-color: color-mix(in srgb, var(--primary-color) 18%, transparent);
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
    background-color: color-mix(in srgb, var(--primary-color) 28%, transparent);
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
    background-color: rgba(79, 70, 229, 0.08);
    background-color: color-mix(in srgb, var(--primary-color) 12%, transparent);
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
  background-color: rgba(79, 70, 229, 0.12);
  background-color: color-mix(in srgb, var(--primary-color) 18%, transparent);
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
  background-color: rgba(239, 68, 68, 0.85);
  background-color: color-mix(in srgb, var(--danger-color) 80%, transparent);
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
  justify-content: center;
  width: 100%;
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

const ImportMessage = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.85rem;
  color: var(--text-light);
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
  FormGrid,
  PrimaryColumn,
  SidebarColumn,
  SectionCard,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  PreviewDialog,
  PreviewHeading,
  PreviewBody,
  ButtonGroup,
  Button,
  PrimaryButton,
  SecondaryButton,
  Form,
  FormGroup,
  Label,
  Input,
  SelectControl,
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
  ImportMessage,
  LinksWrap,
  LinkRow,
  SmallRemove,
};
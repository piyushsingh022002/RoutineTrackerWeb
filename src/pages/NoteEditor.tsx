import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
import {
  DialogOverlay,
  DialogBox,
  DialogClose,
  EditorCard,
  EditorContainer,
  Content,
  LeftColumn,
  RightColumn,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
  // Form,
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
} from '../pages.styles/NoteEditor.style';
import type { Note } from '../types';
import { useNotes } from "../context/NotesContext";
import { FaDownload, FaTimes, FaCheck, FaUpload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import Header from "../components/common/Header";
// CodeMirror editor
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { json as jsonLang } from "@codemirror/lang-json";
import { html } from "@codemirror/lang-html";
import { css as cssLang } from "@codemirror/lang-css";

interface NoteEditorProps {
  hideHeader?: boolean;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ hideHeader = false }) => {
  // State for opened attachment modal
  const [openAttachment, setOpenAttachment] = useState<null | { url: string; idx: number }>(null);
  const location = useLocation();
  const navigate = useNavigate();
  // If a note object was passed via navigation state, use it to prefill the form
  const initialNote = (location.state as { note?: Note } | null)?.note;
  // If the user navigates to a different route (e.g., /dashboard), unmount NoteEditor
  useEffect(() => {
    const path = location.pathname;
    // Only allow NoteEditor to render on /notes/new or /notes/:id/edit
    const isEditorRoute =
      path === '/notes/new' ||
      path === '/create-new-note' ||
      (/^\/notes\/[\w-]+\/edit$/.test(path));
    if (!isEditorRoute) {
      // Unmount by navigating to the new path (should not render NoteEditor)
      // This is a guard in case the router fails to remount
      navigate(path, { replace: true });
    }
  }, [location.pathname, navigate]);
  const { id } = useParams<{ id: string }>();
  const {
    getNote,
    createNote,
    updateNote,
    clearCurrentNote,
    currentNote,
  // error,
  } = useNotes();

  // Prefill local editor state from navigation state to avoid blank UI while
  // the note is fetched in the background. We still call getNote(id) to
  // refresh the note from the server.
  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || '');
      setContent(initialNote.content || '');
      setTags(initialNote.tags || []);
      setFileUrls(initialNote.mediaUrls || []);
    }
  }, [initialNote]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<{
    title?: string;
    content?: string;
  }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  // Dialog state for showing saved note
  const [showNoteDialog, setShowNoteDialog] = useState<Note | null>(null);
  // Track if we should show dialog after note creation
  const [pendingShowDialog, setPendingShowDialog] = useState(false);
  // Track dialog status for success/error messaging
  const [dialogStatus, setDialogStatus] = useState<'idle' | 'success' | 'error'>('idle');
  type LinkItem = { title: string; url: string };
  const [links, setLinks] = useState<LinkItem[]>([]);
  // Helpers for links section in content (moved here so effects can reference them)
  const LINKS_START = '<!-- LINKS:START -->';
  const LINKS_END = '<!-- LINKS:END -->';
  const buildLinksBlock = (items: LinkItem[]) => {
    if (!items.length) return '';
    const lines = items.map((it) => `- [${it.title || it.url}](${it.url})`).join('\n');
    return `\n\n${LINKS_START}\n## Links\n${lines}\n${LINKS_END}\n`;
  };
  const stripLinksBlock = (text: string) => {
    const start = text.indexOf(LINKS_START);
    const end = text.indexOf(LINKS_END);
    if (start !== -1 && end !== -1 && end > start) {
      return text.slice(0, start).trimEnd() + '\n\n' + text.slice(end + LINKS_END.length).trimStart();
    }
    return text;
  };
  const parseLinksFromContent = React.useCallback((text: string) => {
    const start = text.indexOf(LINKS_START);
    const end = text.indexOf(LINKS_END);
    if (start !== -1 && end !== -1 && end > start) {
      const between = text.slice(start, end);
      const found: LinkItem[] = [];
      // match - [title](https://...)
      const re = /- \[(.+?)\]\((https?:[^)]+)\)/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(between))) {
        found.push({ title: m[1], url: m[2] });
      }
      return { cleanContent: stripLinksBlock(text), foundLinks: found };
    }
    return { cleanContent: text, foundLinks: [] as LinkItem[] };
  }, [LINKS_START, LINKS_END]);
  const [syntax, setSyntax] = useState<
    'markdown' | 'plain' | 'javascript' | 'typescript' | 'python' | 'json' | 'html' | 'css' | 'java' | 'react'
  >('markdown');

  const isEditMode = !!id;

  // If rendering as the create-new-note path, apply semi-dark theme for editor
  useEffect(() => {
    const path = location.pathname;
    const isCreateNew = path === '/create-new-note' || path === '/notes/new';
    if (isCreateNew) {
      document.body.classList.add('semi-dark');
      return () => document.body.classList.remove('semi-dark');
    }
    return undefined;
  }, [location.pathname]);

  

  // Load note data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      getNote(id);
    }
    return () => {
      clearCurrentNote();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, id]);

  // Set form data when current note changes
  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      // Extract links section if present and remove from content for editing
      const { cleanContent, foundLinks } = parseLinksFromContent(currentNote.content);
      setContent(cleanContent);
      setLinks(foundLinks);
      setTags(currentNote.tags || []);
      setFileUrls(currentNote.mediaUrls || []);
      // Show dialog after new note creation
      if (pendingShowDialog) {
        setShowNoteDialog(currentNote);
        setPendingShowDialog(false);
      }
    }
    // parseLinksFromContent is defined in this component; include it to satisfy lint rules
  }, [currentNote, pendingShowDialog, parseLinksFromContent]);

  // Handle tag input
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const newFiles = Array.from(e.target.files);

      // Validate file types
      const validFiles = newFiles.filter((file) => {
        const fileType = file.type;
        return fileType.startsWith("image/") || fileType === "application/pdf";
      });

      // Add new files
      setFiles([...files, ...validFiles]);

      // Create object URLs for preview
      const newFileUrls = validFiles.map((file) => URL.createObjectURL(file));
      setFileUrls([...fileUrls, ...newFileUrls]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newFileUrls = [...fileUrls];
    URL.revokeObjectURL(newFileUrls[index]);
    newFileUrls.splice(index, 1);
    setFileUrls(newFileUrls);
  };

  // CodeMirror extensions based on selected syntax
  const codeExtensions = (() => {
    switch (syntax) {
      case 'markdown': return [markdown()];
      case 'javascript': return [javascript({ jsx: true, typescript: false })];
      case 'typescript': return [javascript({ jsx: true, typescript: true })];
      case 'python': return [python()];
      case 'json': return [jsonLang()];
      case 'html': return [html()];
      case 'css': return [cssLang()];
      default: return [];
    }
  })();

  const placeholderText = syntax === 'markdown'
    ? 'Write in Markdown... (Headings, lists, code blocks, etc.)'
    : 'Start typing your note...';

  // Form validation
  const validateForm = () => {
    const errors: { title?: string; content?: string } = {};

    if (!title.trim()) {
      errors.title = "Title is required";
    }

    if (!content.trim()) {
      errors.content = "Content is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const validateUrl = (val: string) => {
    try { const u = new URL(val); return !!u.protocol && !!u.host; } catch { return false; }
  };

  const addLinkRow = () => setLinks((prev) => [...prev, { title: '', url: '' }]);
  const updateLinkRow = (idx: number, key: keyof LinkItem, value: string) => {
    setLinks((prev) => prev.map((l, i) => i === idx ? { ...l, [key]: value } : l));
  };
  const removeLinkRow = (idx: number) => setLinks((prev) => prev.filter((_, i) => i !== idx));

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSaving(true);

      try {
        // Synthesize links block into content before sending
        const prunedLinks = links.filter(l => l.url && validateUrl(l.url));
        const contentWithoutLinks = stripLinksBlock(content);
        const finalContent = contentWithoutLinks + buildLinksBlock(prunedLinks);

        const noteData = {
          title,
          content: finalContent,
          tags,
          mediaUrls: fileUrls,
        };

        if (isEditMode && id) {
          await updateNote(id, noteData);
          setShowNoteDialog({
            ...noteData,
            id: Number(id),
            userId: 1, // fallback userId
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as Note);
          setDialogStatus('success');
        } else {
          // Await the backend so the NotesContext gets the created note before we show dialog
          try {
            const created = await createNote(noteData);
            setShowNoteDialog(created);
            setDialogStatus('success');
          } catch (err) {
            // If create fails, still show a simple dialog with temp data and show error
            console.error('Create note failed:', err);
            setShowNoteDialog({
              ...noteData,
              id: Date.now(), // temp id
              userId: 1, // fallback userId
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
            setDialogStatus('error');
          }
        }
    } catch (err: unknown) {
      console.error("Note submission failed:", err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate(-1);
  };
  // Centralized dialog close that clears current note and navigates back
  // (moved above)
  const closeDialog = useCallback(() => {
    // clear context state to avoid stale UI
    clearCurrentNote();
    setShowNoteDialog(null);
    // If a background location exists (modal pattern), go back in history
    const state = (location.state ?? null) as { background?: Location } | null;
    if (state && state.background) {
      navigate(-1);
    } else {
      // otherwise navigate to dashboard and replace to avoid stale history
      navigate('/dashboard', { replace: true });
    }
  }, [clearCurrentNote, navigate, location]);

  // Auto-close the save dialog after 5 seconds if user doesn't close it
  useEffect(() => {
    if (!showNoteDialog) return;
    const timer = setTimeout(() => {
      // Only close if still open
      if (showNoteDialog) closeDialog();
    }, 5000);
    return () => clearTimeout(timer);
    // include closeDialog in deps to ensure latest reference is used
  }, [showNoteDialog, closeDialog]);
 const handleDownloadPDF = (imageFile : File | null) => {
  const doc = new jsPDF();

  try {
    // Add text content
    doc.setFontSize(16);
    doc.text("Note", 20, 20);
    doc.setFontSize(12);
    doc.text(`Title: ${title || "Untitled"}`, 20, 30);
    doc.text("Content:", 20, 40);
    doc.text(content || "No content", 20, 50, { maxWidth: 170 });
    doc.text(`Tags: ${tags && tags.length ? tags.join(", ") : "No tags"}`, 20, 90);

    // Handle image if provided
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imgData = e.target?.result as string; // Base64 string
          // Add image to PDF (adjust x, y, width, height as needed)
          doc.addImage(imgData, "JPEG", 20, 100, 100, 100);
          // Save the PDF after image is added
          doc.save(`${title || "note"}.pdf`);
        } catch (error) {
          console.error("Error adding image to PDF:", error);
          // Save PDF without image if image fails
          doc.save(`${title || "note"}.pdf`);
        }
      };
      reader.onerror = () => {
        console.error("Error reading image file");
        // Save PDF without image if reading fails
        doc.save(`${title || "note"}.pdf`);
      };
      reader.readAsDataURL(imageFile); // Convert image to base64
    } else {
      // Save PDF immediately if no image is provided
      console.log("No image provided, saving PDF without image");
      doc.save(`${title || "note"}.pdf`);
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    // Attempt to save PDF even if an error occurs
    doc.save(`${title || "note"}.pdf`);
  }
};

  // Import notes from JSON file
  const handleImportNotesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportMessage(null);
    setIsImporting(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const list = Array.isArray(data) ? data : Array.isArray(data?.notes) ? data.notes : null;
      if (!list) throw new Error('Invalid file format. Expecting an array of notes or { "notes": [...] }');

      let created = 0;
      for (const item of list) {
        const t = (item?.title ?? '').toString();
        const c = (item?.content ?? '').toString();
        if (!t && !c) continue;
        await createNote({
          title: t || 'Untitled',
          content: c || '',
          tags: Array.isArray(item?.tags) ? item.tags : [],
          mediaUrls: Array.isArray(item?.mediaUrls) ? item.mediaUrls : [],
        });
        created++;
      }
      setImportMessage(created > 0 ? `Imported ${created} note${created === 1 ? '' : 's'} successfully.` : 'No valid notes found to import.');
    } catch (err: unknown) {
      console.error('Import failed:', err);
      const message = typeof err === 'object' && err !== null && 'message' in err && typeof (err as Record<string, unknown>).message === 'string'
        ? (err as Record<string, unknown>).message as string
        : 'Import failed. Please check the file and try again.';
      setImportMessage(message);
    } finally {
      setIsImporting(false);
      // reset input to allow re-selecting the same file
      e.target.value = '';
    }
  };

  return (
    <>
      {!hideHeader && <Header />}
      <EditorContainer $inline={hideHeader}>
        <Content $inline={hideHeader}>
          {/* Show dialog with saved note after creation */}
          {showNoteDialog && (
            <DialogOverlay onClick={closeDialog} tabIndex={-1}>
              <DialogBox onClick={(e) => e.stopPropagation()} tabIndex={0}>
                <DialogClose onClick={closeDialog}>&times;</DialogClose>
                {dialogStatus === 'success' && (
                  <div style={{ color: 'green', marginBottom: 8 }}>This note was created successfully.</div>
                )}
                {dialogStatus === 'error' && (
                  <div style={{ color: 'crimson', marginBottom: 8 }}>There was an error creating the note.</div>
                )}
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{showNoteDialog.title}</h2>
                <div style={{ color: '#666', marginBottom: 12 }}>{showNoteDialog.content}</div>
                {showNoteDialog.tags && showNoteDialog.tags.length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <b>Tags:</b> {showNoteDialog.tags.join(', ')}
                  </div>
                )}
                {showNoteDialog.mediaUrls && showNoteDialog.mediaUrls.length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <b>Attachments:</b>
                    <ul style={{ paddingLeft: 18 }}>
                      {showNoteDialog.mediaUrls.map((url: string, idx: number) => (
                        <li key={idx}>
                          <button
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#4a6cf7',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              fontSize: 'inherit',
                              padding: 0,
                            }}
                            onClick={() => setOpenAttachment({ url, idx })}
                          >
                            Attachment {idx + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </DialogBox>
            </DialogOverlay>
          )}
          {/* Attachment overlay modal */}
          {openAttachment && (
            <DialogOverlay onClick={() => setOpenAttachment(null)} tabIndex={-1}>
              <DialogBox onClick={e => e.stopPropagation()} tabIndex={0}>
                <DialogClose onClick={() => setOpenAttachment(null)}>&times;</DialogClose>
                <div style={{ marginBottom: 16, fontWeight: 600 }}>
                  Attachment {openAttachment.idx + 1}
                </div>
                {openAttachment.url.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                  <img src={openAttachment.url} alt={`Attachment ${openAttachment.idx + 1}`} style={{ maxWidth: 360, maxHeight: 480, borderRadius: 8 }} />
                ) : (
                  <iframe src={openAttachment.url} title={`Attachment ${openAttachment.idx + 1}`} style={{ width: 360, height: 480, border: 'none', borderRadius: 8 }} />
                )}
              </DialogBox>
            </DialogOverlay>
          )}
          {/* ...existing code... (rest of the editor UI) */}
          {!showNoteDialog && (
            <EditorCard
              $inline={hideHeader}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              isCancelHovered={isCancelHovered}
              isSaveHovered={isSaveHovered}
            >
              <form style={{ display: 'flex', width: '100%', gap: '2.5rem' }} onSubmit={handleSubmit}>
                <LeftColumn>
                  <FormGroup>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Note title"
                    />
                    {formErrors.title && (
                      <ErrorMessage>{formErrors.title}</ErrorMessage>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="note-type">Note Type</Label>
                    <select
                      id="note-type"
                      value={syntax}
                      onChange={e => setSyntax(e.target.value as typeof syntax)}
                      style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #e5e7eb', fontSize: '1rem', marginBottom: 8 }}
                    >
                      <option value="plain">Plain Text</option>
                      <option value="markdown">Markdown</option>
                      <option value="json">JSON</option>
                      <option value="javascript">JavaScript</option>
                      <option value="typescript">TypeScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="react">React JSX</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="content">Content</Label>
                    <EditorFieldWrap
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <CodeMirror
                        value={content}
                        height="320px"
                        extensions={codeExtensions}
                        onChange={(val:string) => setContent(val)}
                        basicSetup={{ lineNumbers: true, foldGutter: true, highlightActiveLine: true }}
                        placeholder={placeholderText}
                      />
                    </EditorFieldWrap>
                    {formErrors.content && (
                      <ErrorMessage>{formErrors.content}</ErrorMessage>
                    )}
                  </FormGroup>
                </LeftColumn>
                <RightColumn>
                  <FormGroup>
                    <Label>Tags</Label>
                    <TagsInput>
                      {tags.map((tag, index) => (
                        <Tag key={index}>
                          <TagText>{tag}</TagText>
                          <RemoveTagButton type="button" onClick={() => removeTag(tag)}>
                            ×
                          </RemoveTagButton>
                        </Tag>
                      ))}
                      <TagInput
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagInputKeyDown}
                        onBlur={addTag}
                        placeholder={tags.length === 0 ? "Add tags (press Enter)" : ""}
                      />
                    </TagsInput>
                  </FormGroup>
                  <FormGroup>
                    <Label>Links (Title + URL)</Label>
                    <LinksWrap>
                      {links.map((l, idx) => (
                        <LinkRow key={idx}>
                          <Input
                            type="text"
                            placeholder="Link title"
                            value={l.title}
                            onChange={(e) => updateLinkRow(idx, 'title', e.target.value)}
                          />
                          <Input
                            type="url"
                            placeholder="https://example.com"
                            value={l.url}
                            onChange={(e) => updateLinkRow(idx, 'url', e.target.value)}
                          />
                          <SmallRemove type="button" onClick={() => removeLinkRow(idx)}>Remove</SmallRemove>
                        </LinkRow>
                      ))}
                      <SecondaryButton type="button" onClick={addLinkRow}>+ Add Link</SecondaryButton>
                    </LinksWrap>
                  </FormGroup>
                  <FormGroup>
                    <Label>Attachments</Label>
                    <FileUploadContainer
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <FileInput
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                      />
                      <FileUploadIcon>📎</FileUploadIcon>
                      <FileUploadText>Click to upload files</FileUploadText>
                      <FileUploadSubtext>
                        Supports images and PDF documents
                      </FileUploadSubtext>
                    </FileUploadContainer>
                    {fileUrls.length > 0 && (
                      <FilePreviewContainer>
                        {fileUrls.map((url, index) => (
                          <FilePreview key={index}>
                            {url.startsWith("blob:") ||
                            url.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                              <FilePreviewImage src={url} alt={`Preview ${index}`} />
                            ) : (
                              <FilePreviewDocument>PDF Document</FilePreviewDocument>
                            )}
                            <RemoveFileButton
                              type="button"
                              onClick={() => removeFile(index)}
                            >
                              ×
                            </RemoveFileButton>
                          </FilePreview>
                        ))}
                      </FilePreviewContainer>
                    )}
                  </FormGroup>
                  <ButtonGroup>
                    <SecondaryButton
                      type="button"
                      onClick={handleCancel}
                      onMouseEnter={() => setIsCancelHovered(true)}
                      onMouseLeave={() => setIsCancelHovered(false)}
                    >
                      Cancel
                      <FaTimes />
                    </SecondaryButton>
                    <PrimaryButton
                      type="submit"
                      disabled={isSaving}
                      onMouseEnter={() => setIsSaveHovered(true)}
                      onMouseLeave={() => setIsSaveHovered(false)}
                    >
                      {isSaving ? "Saving..." : "Save Note"}
                      <FaCheck />
                    </PrimaryButton>
                  </ButtonGroup>
                  <DownloadButton type="button" onClick={() => handleDownloadPDF(null)}>
                    Download as PDF
                    <FaDownload />
                  </DownloadButton>
                  {/* Import Notes */}
                  <input
                    id="import-notes-input"
                    type="file"
                    accept="application/json"
                    style={{ display: 'none' }}
                    onChange={handleImportNotesChange}
                  />
                  <SecondaryButton
                    type="button"
                    onClick={() => document.getElementById('import-notes-input')?.click()}
                    disabled={isImporting}
                    style={{ marginTop: '0.75rem' }}
                  >
                    {isImporting ? 'Importing…' : 'Inport your Notes safely'}
                    <FaUpload />
                  </SecondaryButton>
                  {importMessage && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                      {importMessage}
                    </div>
                  )}
                </RightColumn>
              </form>
            </EditorCard>
          )}
        </Content>
      </EditorContainer>
    </>
  );
};

export default NoteEditor;

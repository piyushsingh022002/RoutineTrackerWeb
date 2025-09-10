import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { device } from '../styles/breakpoints';
import { useNotes } from "../context/NotesContext";
import { FaStickyNote, FaDownload, FaTimes, FaCheck, FaUpload } from "react-icons/fa";
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

const EditorCard = styled(motion.div)<{ isCancelHovered: boolean; isSaveHovered: boolean }>`
  background: rgba(255,255,255,0.98);
  border-radius: 1.25rem;
  box-shadow: 0 10px 320px 0 rgba(31, 38, 135, 0.12);
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2.5rem 2rem 2rem 2rem;
  transition: border 0.3s, box-shadow 0.3s;
  border: 2px solid
    ${({ isCancelHovered, isSaveHovered }) =>
      isCancelHovered
        ? "var(--danger-color)"
        : isSaveHovered
        ? "var(--secondary-color)"
        : "transparent"};
  @media ${device.mobile} {
    padding: 1.25rem 0.5rem;
  }
`;

const EditorContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: transparent; /* align with global background/cursor */
  padding: 96px 0 2rem; /* offset for fixed header */
  box-sizing: border-box;
`;

const Content = styled.main`
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 1rem;
  box-sizing: border-box;
  @media ${device.tablet} { width: 92%; }
  @media ${device.mobile} { width: 94%; padding: 0 0.5rem; }
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
`;

const EditorTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  font-family: "Roboto", sans-serif;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  letter-spacing: -1px;
  transition: transform 0.3s, color 0.3s;
  svg {
    font-size: 2.2rem;
    filter: drop-shadow(0 2px 6px rgba(79,70,229,0.12));
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
  .cm-theme, .cm-editor { background: transparent; }
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

const NoteEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getNote,
    createNote,
    updateNote,
    clearCurrentNote,
    currentNote,
    error,
  } = useNotes();

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
  type LinkItem = { title: string; url: string };
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [syntax, setSyntax] = useState<
    'markdown' | 'plain' | 'javascript' | 'typescript' | 'python' | 'json' | 'html' | 'css'
  >('markdown');

  const isEditMode = !!id;

  // Load note data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      getNote(id);
    }

    return () => {
      clearCurrentNote();
    };
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
    }
  }, [currentNote]);

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

  // Helpers for links section in content
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
  const parseLinksFromContent = (text: string) => {
    const start = text.indexOf(LINKS_START);
    const end = text.indexOf(LINKS_END);
    if (start !== -1 && end !== -1 && end > start) {
      const between = text.slice(start, end);
      const found: LinkItem[] = [];
      const re = /- \[(.+?)\]\((https?:[^\)]+)\)/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(between))) {
        found.push({ title: m[1], url: m[2] });
      }
      return { cleanContent: stripLinksBlock(text), foundLinks: found };
    }
    return { cleanContent: text, foundLinks: [] as LinkItem[] };
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
        } else {
          await createNote(noteData);
        }

        navigate("/dashboard");
      } catch (err) {
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
    } catch (err: any) {
      console.error('Import failed:', err);
      setImportMessage(err?.message || 'Import failed. Please check the file and try again.');
    } finally {
      setIsImporting(false);
      // reset input to allow re-selecting the same file
      e.target.value = '';
    }
  };

  return (
    <>
      <Header />
      <EditorContainer>
        <Content>
      {/* Pass hover states to EditorCard */}
      <EditorCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        isCancelHovered={isCancelHovered}
        isSaveHovered={isSaveHovered}
      >
        <EditorHeader>
          <EditorTitle>
            <FaStickyNote />
            {isEditMode ? "Edit Note" : "Create New Note"}
          </EditorTitle>
          <ButtonGroup>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8 }}>
              <label htmlFor="syntax" style={{ fontSize: 12, color: 'var(--text-light)' }}>Syntax</label>
              <select
                id="syntax"
                value={syntax}
                onChange={(e) => setSyntax(e.target.value as any)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 10,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-light)',
                  color: 'var(--text-color)'
                }}
              >
                <option value="markdown">Markdown</option>
                <option value="plain">Plain Text</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="json">JSON</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
              </select>
            </div>
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
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              onMouseEnter={() => setIsSaveHovered(true)}
              onMouseLeave={() => setIsSaveHovered(false)}
            >
              {isSaving ? "Saving..." : "Save Note"}
              <FaCheck />
            </PrimaryButton>
          </ButtonGroup>
        </EditorHeader>

        {error && (
          <motion.div
            className="alert alert-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        <Form onSubmit={handleSubmit}>
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
                onChange={(val) => setContent(val)}
                basicSetup={{ lineNumbers: true, foldGutter: true, highlightActiveLine: true }}
                placeholder={placeholderText}
              />
            </EditorFieldWrap>
            {formErrors.content && (
              <ErrorMessage>{formErrors.content}</ErrorMessage>
            )}
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
            <Label htmlFor="tags">Tags</Label>
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
        </Form>
      </EditorCard>
        </Content>
      </EditorContainer>
    </>
  );
};

export default NoteEditor;

import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNotes } from '../context/NotesContext';
import Header from '../components/common/Header';
import Loader from '../components/common/Loader';
import { device } from '../styles/breakpoints';

const ViewNoteContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background:
    radial-gradient(ellipse 110% 80% at 20% 0%, var(--dashboard-overlay-2) 0%, transparent 60%),
    radial-gradient(ellipse 90% 70% at 80% 0%, var(--dashboard-overlay-3) 0%, transparent 65%),
    linear-gradient(120deg, var(--dashboard-base-start) 0%, var(--dashboard-base-end) 100%);
  background-attachment: fixed;
  padding-top: 88px;
  padding-bottom: 2rem;

  @media ${device.tablet} {
    padding-top: 72px;
  }

  @media ${device.mobile} {
    padding-top: 64px;
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  @media ${device.tablet} {
    padding: 1.5rem;
  }

  @media ${device.mobile} {
    padding: 1rem;
  }
`;

const NoteCard = styled(motion.div)`
  background-color: var(--bg-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 2rem;

  @media ${device.tablet} {
    padding: 1.5rem;
  }

  @media ${device.mobile} {
    padding: 1.25rem;
  }
`;

const BackButtonBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  font-weight: 600;
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  background: rgba(59, 130, 246, 0.1);

  &:hover {
    color: var(--primary-color);
    background: rgba(59, 130, 246, 0.15);
    transform: translateX(-2px);
  }

  @media ${device.mobile} {
    font-size: 0.9rem;
  }
`;

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

const NoteTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.3;

  @media ${device.tablet} {
    font-size: 1.5rem;
  }

  @media ${device.mobile} {
    font-size: 1.25rem;
  }
`;

const NoteDate = styled.p`
  font-size: 0.875rem;
  color: var(--text-light);
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media ${device.mobile} {
    width: 100%;

    button,
    a {
      flex: 1;
      min-width: 100px;
    }
  }
`;

const Button = styled.button`
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 0.95rem;

  @media ${device.mobile} {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
`;

const EditButton = styled(Link)`
  padding: 0.625rem 1.25rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, #6366f1 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  display: inline-block;
  text-align: center;
  transition: all 0.2s ease;
  text-decoration: none;
  font-size: 0.95rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
  }

  @media ${device.mobile} {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
`;

const DeleteButton = styled(Button)`
  background-color: var(--danger-color);
  color: white;

  &:hover {
    background-color: var(--danger-hover);
    transform: translateY(-2px);
  }
`;

const NoteContent = styled.div`
  line-height: 1.8;
  margin-bottom: 2rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 1rem;
  color: var(--text-color);

  @media ${device.mobile} {
    font-size: 0.95rem;
  }
`;

const NoteTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const NoteTag = styled.span`
  font-size: 0.8rem;
  padding: 0.35rem 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary-color);
  border-radius: 0.5rem;
  font-weight: 600;

  @media ${device.mobile} {
    font-size: 0.75rem;
  }
`;

const MediaSection = styled.div`
  margin-top: 2rem;
  border-top: 1px solid var(--card-border);
  padding-top: 1.5rem;
`;

const MediaTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;

  @media ${device.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
  }
`;

const MediaItem = styled.div`
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  background: var(--bg-color);
`;

const MediaImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;

  @media ${device.mobile} {
    height: 120px;
  }
`;

const MediaDocument = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary-color);
  text-decoration: none;
  padding: 1rem;
  text-align: center;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(59, 130, 246, 0.2);
    transform: scale(1.05);
  }

  @media ${device.mobile} {
    height: 120px;
    padding: 0.75rem;
  }
`;

const DocumentIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: var(--danger-color);
  padding: 1.25rem;
  border-radius: var(--radius);
  margin-bottom: 1.5rem;
  text-align: center;
  border-left: 4px solid var(--danger-color);
`;

const ConfirmDialog = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
`;

const DialogContent = styled(motion.div)`
  background: var(--bg-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 2rem;
  max-width: 400px;
  width: 100%;

  @media ${device.mobile} {
    padding: 1.5rem;
  }
`;

const DialogTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const DialogText = styled.p`
  margin-bottom: 1.5rem;
  color: var(--text-light);
  line-height: 1.5;
`;

const DialogButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  flex-wrap: wrap;

  @media ${device.mobile} {
    gap: 0.75rem;

    button {
      flex: 1;
      min-width: 100px;
    }
  }
`;

const CancelButton = styled(Button)`
  background: transparent;
  color: var(--text-color);
  border: 1px solid var(--card-border-strong);

  &:hover {
    background: var(--bg-color);
  }
`;

const ConfirmButton = styled(Button)`
  background: var(--danger-color);
  color: white;
  border: none;

  &:hover {
    background: var(--danger-hover);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const ViewNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getNote, deleteNote, currentNote, isLoading, error } = useNotes();
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  
  useEffect(() => {
    if (id) {
      getNote(id);
    }
  }, [id, getNote]);
  
  const handleDelete = async () => {
    if (id) {
      try {
        await deleteNote(id);
        navigate('/notes');
      } catch (err) {
        console.error("Failed to delete note:", err);
      }
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Check if URL is an image
  const isImageUrl = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/i) !== null;
  };
  
  if (isLoading) {
    return (
      <>
        <Header />
        <ViewNoteContainer>
          <Content>
            <NoteCard>
              <LoadingContainer>
                <Loader text="Loading note..." />
              </LoadingContainer>
            </NoteCard>
          </Content>
        </ViewNoteContainer>
      </>
    );
  }
  
  if (error) {
    return (
      <>
        <Header />
        <ViewNoteContainer>
          <Content>
            <NoteCard>
              <ErrorMessage>{error}</ErrorMessage>
              <BackButton to="/notes">← Back to All Notes</BackButton>
            </NoteCard>
          </Content>
        </ViewNoteContainer>
      </>
    );
  }
  
  if (!currentNote) {
    return (
      <>
        <Header />
        <ViewNoteContainer>
          <Content>
            <NoteCard>
              <ErrorMessage>Note not found</ErrorMessage>
              <BackButton to="/notes">← Back to All Notes</BackButton>
            </NoteCard>
          </Content>
        </ViewNoteContainer>
      </>
    );
  }
  
  return (
    <>
      <Header />
      <ViewNoteContainer>
        <Content>
          <BackButtonBar>
            <BackButton to="/notes">← Back to All Notes</BackButton>
          </BackButtonBar>

          <NoteCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NoteHeader>
              <div>
                <NoteTitle>{currentNote.title}</NoteTitle>
                <NoteDate>{formatDate(currentNote.createdAt)}</NoteDate>
              </div>
              <ButtonGroup>
                <EditButton to={`/notes/${id}/edit`}>✏️ Edit</EditButton>
                <DeleteButton onClick={() => setShowDeleteConfirm(true)}>🗑️ Delete</DeleteButton>
              </ButtonGroup>
            </NoteHeader>
            
            <NoteContent>{currentNote.content}</NoteContent>
            
            {currentNote.tags && currentNote.tags.length > 0 && (
              <NoteTags>
                {currentNote.tags.map((tag, index) => (
                  <NoteTag key={index}>#{tag}</NoteTag>
                ))}
              </NoteTags>
            )}
            
            {currentNote.mediaUrls && currentNote.mediaUrls.length > 0 && (
              <MediaSection>
                <MediaTitle>📎 Attachments</MediaTitle>
                <MediaGrid>
                  {currentNote.mediaUrls.map((url, index) => (
                    <MediaItem key={index}>
                      {isImageUrl(url) ? (
                        <MediaImage src={url} alt={`Attachment ${index + 1}`} />
                      ) : (
                        <MediaDocument href={url} target="_blank" rel="noopener noreferrer">
                          <DocumentIcon>📄</DocumentIcon>
                          <span>Doc {index + 1}</span>
                        </MediaDocument>
                      )}
                    </MediaItem>
                  ))}
                </MediaGrid>
              </MediaSection>
            )}
          </NoteCard>
          
          {/* Delete Confirmation Dialog */}
          {showDeleteConfirm && (
            <ConfirmDialog
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogContent
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DialogTitle>Delete Note?</DialogTitle>
                <DialogText>
                  Are you sure you want to delete this note? This action cannot be undone.
                </DialogText>
                <DialogButtons>
                  <CancelButton onClick={() => setShowDeleteConfirm(false)}>
                    Cancel
                  </CancelButton>
                  <ConfirmButton onClick={handleDelete}>
                    Delete
                  </ConfirmButton>
                </DialogButtons>
              </DialogContent>
            </ConfirmDialog>
          )}
        </Content>
      </ViewNoteContainer>
    </>
  );
};

export default ViewNote;

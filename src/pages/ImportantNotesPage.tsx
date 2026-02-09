import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNotes } from '../context/NotesContext';
import Header from '../components/common/Header';
import Loader from '../components/common/Loader';
import { device } from '../styles/breakpoints';
import type { Note } from '../types';

const PageContainer = styled.div`
  min-height: 100vh;
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
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;

  @media ${device.tablet} {
    padding: 1.5rem;
  }

  @media ${device.mobile} {
    padding: 1rem;
  }
`;

const Header_Section = styled.div`
  margin-bottom: 3rem;
`;

const PageTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media ${device.tablet} {
    font-size: 2rem;
  }

  @media ${device.mobile} {
    font-size: 1.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1rem;
  color: var(--text-light);
  margin: 0;
`;

const FiltersAndActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 250px;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--card-border-strong);
  background: var(--bg-light);
  color: var(--text-color);
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  @media ${device.mobile} {
    min-width: auto;
  }
`;

const CreateButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(239, 68, 68, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const NotesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;

  @media ${device.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  @media ${device.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const NoteCardWrapper = styled(motion.div)`
  cursor: pointer;
`;

const NoteCard = styled.div`
  background: var(--bg-light);
  border-radius: 1rem;
  border: 2px solid var(--card-border-strong);
  border-left: 5px solid #ef4444;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ef4444, #dc2626);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(239, 68, 68, 0.15);
    border-color: #ef4444;

    &::before {
      opacity: 1;
    }
  }
`;

const ImportanceIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #ef4444;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const NoteMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const NoteDate = styled.span`
  font-size: 0.75rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
`;

const Tag = styled.span`
  font-size: 0.7rem;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 0.25rem 0.5rem;
  border-radius: 0.35rem;
  font-weight: 600;
`;

const NoteTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: var(--text-color);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const NoteContent = styled.p`
  font-size: 0.9rem;
  color: var(--text-light);
  margin: 0.75rem 0 0 0;
  flex-grow: 1;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const NoteFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--card-border);
  font-size: 0.8rem;
  color: var(--text-light);
`;

const ReadMoreButton = styled.button`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(2px);
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

const EmptyMessage = styled.p`
  font-size: 1rem;
  color: var(--text-light);
  margin-bottom: 1.5rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 25,
    },
  },
};

const ImportantNotesPage: React.FC = () => {
  const { importantNotes, isLoading, getImportantNotes } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getImportantNotes();
  }, [getImportantNotes]);

  const filteredNotes = importantNotes.filter((note: Note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Content>
          <Header_Section>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <PageTitle>❗ Important Notes</PageTitle>
              <PageSubtitle>Your critical and urgent notes requiring attention</PageSubtitle>
            </motion.div>
          </Header_Section>

          <FiltersAndActions>
            <SearchInput
              type="text"
              placeholder="Search important notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CreateButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/notes/new')}
            >
              + New Note
            </CreateButton>
          </FiltersAndActions>

          {isLoading ? (
            <LoadingContainer>
              <Loader />
            </LoadingContainer>
          ) : filteredNotes.length > 0 ? (
            <NotesGrid
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredNotes.map((note: Note) => (
                <NoteCardWrapper
                  key={note.id}
                  variants={itemVariants}
                  onClick={() => navigate(`/notes/${note.id}`)}
                >
                  <NoteCard>
                    <ImportanceIndicator>
                      ⚠️ IMPORTANT
                    </ImportanceIndicator>
                    <NoteMeta>
                      <NoteDate>{formatDate(note.createdAt)}</NoteDate>
                      <span>❗</span>
                    </NoteMeta>
                    <Tags>
                      {note.tags && note.tags.map((tag: string) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </Tags>
                    <NoteTitle>{note.title || 'Untitled Note'}</NoteTitle>
                    <NoteContent>{truncateContent(note.content)}</NoteContent>
                    <NoteFooter>
                      <span>{note.content.split(' ').length} words</span>
                      <ReadMoreButton onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/notes/${note.id}`);
                      }}>
                        Read More
                      </ReadMoreButton>
                    </NoteFooter>
                  </NoteCard>
                </NoteCardWrapper>
              ))}
            </NotesGrid>
          ) : (
            <EmptyState
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EmptyIcon>❗</EmptyIcon>
              <EmptyTitle>No Important Notes Yet</EmptyTitle>
              <EmptyMessage>
                Mark your critical notes as important to keep them prioritized
              </EmptyMessage>
            </EmptyState>
          )}
        </Content>
      </PageContainer>
    </>
  );
};

export default ImportantNotesPage;

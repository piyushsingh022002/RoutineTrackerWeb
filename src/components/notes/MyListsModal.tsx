import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import { useNotes } from '../../context/NotesContext';
import { useNavigate } from 'react-router-dom';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px 10px;
  font-size: 0.9rem;
  color: #374151;
  border-bottom: 1px solid rgba(15,23,42,0.06);
`;

const Td = styled.td`
  padding: 10px;
  font-size: 0.9rem;
  color: #4b5563;
  border-bottom: 1px solid rgba(15,23,42,0.04);
`;

const Empty = styled.div`
  padding: 18px 8px;
  color: #6b7280;
  font-size: 0.95rem;
`;

interface Props {
  open: boolean;
  onClose: () => void;
}

const MyListsModal: React.FC<Props> = ({ open, onClose }) => {
  const { notes, isLoading } = useNotes();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (open) {
      setPassword('');
      setError('');
      setIsAuthenticated(false);
    }
  }, [open]);

  const handleCreateNow = async () => {
    // Navigate to the private notes environment.
    onClose();
    navigate('/private-notes');
  };

  const footer = (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
      <Button variant="outline" size="small" onClick={onClose} shape="pill">
        Hide
      </Button>
      <Button variant="primary" size="small" onClick={handleCreateNow} shape="pill">
        Create One just now
      </Button>
    </div>
  );

  const handleAuthenticate = () => {
    if (password === '12345') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
      setIsAuthenticated(false);
    }
  };

  const authFooter = (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
      <Button variant="outline" size="small" onClick={onClose} shape="pill">
        Cancel
      </Button>
      <Button variant="primary" size="small" onClick={handleAuthenticate} shape="pill">
        Authenticate
      </Button>
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} title="My Lists (Private Notes)" footer={isAuthenticated ? footer : authFooter} width="640px">
      <div style={{ fontSize: 13, color: '#6b7280' }}>These are your private notes. Create a new daily note quickly.</div>

      {isLoading ? (
        <Empty>Loading notes…</Empty>
      ) : !isAuthenticated ? (
        <div style={{ marginTop: 12 }}>
          <Input
            label="Enter password to view lists"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            fullWidth
          />
          <div style={{ fontSize: 13, color: '#6b7280' }}>This area is protected. Enter the password to continue.</div>
        </div>
      ) : notes && notes.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <Th>Date</Th>
              <Th>Title</Th>
              <Th>Tags</Th>
              <Th style={{ textAlign: 'right' }}>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={String(note.id)}>
                <Td>{new Date(note.createdAt).toLocaleDateString()}</Td>
                <Td>{note.title || 'Untitled'}</Td>
                <Td>{(note.tags || []).join(', ')}</Td>
                <Td style={{ textAlign: 'right' }}>
                  <Button size="small" variant="outline" onClick={() => navigate(`/note/${note.id}`)}>
                    Open
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Empty>No private notes yet. Create one to get started.</Empty>
      )}
    </Modal>
  );
};

export default MyListsModal;

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FiDownload, FiImage } from 'react-icons/fi';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
  padding: 2.5rem 1rem 1.5rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  color: #4a6cf7;
  margin-bottom: 1.5rem;
`;

const NoteArea = styled.textarea`
  width: 100%;
  max-width: 700px;
  min-height: 180px;
  font-size: 1.1rem;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #c7d2fe;
  margin-bottom: 1.5rem;
  resize: vertical;
  background: #fff;
  box-shadow: 0 2px 12px rgba(74,108,247,0.07);
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid #4a6cf7;
    outline: none;
  }
`;

const UploadLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #e0e7ff;
  color: #4a6cf7;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1.2rem;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #4a6cf7;
    color: #fff;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PreviewImg = styled.img`
  max-width: 180px;
  max-height: 120px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(74,108,247,0.09);
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #4a6cf7;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.2rem;
  transition: background 0.2s;
  &:hover {
    background: #1d4ed8;
  }
`;

const DownloadOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
  background: #fff;
  border: 1px solid #c7d2fe;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(74,108,247,0.07);
  padding: 0.7rem 1.2rem;
  position: absolute;
  z-index: 10;
`;

const OptionButton = styled.button`
  background: none;
  border: none;
  color: #4a6cf7;
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  padding: 0.3rem 0;
  border-radius: 4px;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #e0e7ff;
    color: #1d4ed8;
  }
`;

const NotePlusPage: React.FC = () => {
  const [note, setNote] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files);
      const imgUrls = filesArr.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...imgUrls]);
    }
  };

  const handleDownload = (type: 'txt' | 'pdf' | 'docx') => {
    setShowOptions(false);
    // Download logic placeholder
    alert(`Download as ${type.toUpperCase()} (implement logic)`);
  };

  return (
    <Container>
      <Title>NotePlus</Title>
      <NoteArea
        placeholder="Write your notes here..."
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      <UploadLabel>
        <FiImage /> Upload Images
        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
      </UploadLabel>
      {images.length > 0 && (
        <ImagePreview>
          {images.map((img, idx) => (
            <PreviewImg src={img} alt={`upload-${idx}`} key={idx} />
          ))}
        </ImagePreview>
      )}
      <div style={{ position: 'relative' }}>
        <DownloadButton onClick={() => setShowOptions(v => !v)}>
          <FiDownload /> Download
        </DownloadButton>
        {showOptions && (
          <DownloadOptions>
            <OptionButton onClick={() => handleDownload('txt')}>Plain Text (.txt)</OptionButton>
            <OptionButton onClick={() => handleDownload('pdf')}>PDF File (.pdf)</OptionButton>
            <OptionButton onClick={() => handleDownload('docx')}>Word File (.docx)</OptionButton>
          </DownloadOptions>
        )}
      </div>
    </Container>
  );
};

export default NotePlusPage;

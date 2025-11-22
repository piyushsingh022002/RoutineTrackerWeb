import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.h1`
  font-size: 28px;
  margin: 0 0 16px 0;
`;

const Subtitle = styled.p`
  color: #6b7280;
`;

const FindStoryBooks: React.FC = () => {
  return (
    <Container>
      <Title>Find New Story Books Here</Title>
      <Subtitle>Discover curated story books and reading suggestions.</Subtitle>
    </Container>
  );
};

export default FindStoryBooks;

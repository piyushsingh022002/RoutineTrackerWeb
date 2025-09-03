import React from 'react';
import styled from 'styled-components';
import { device } from '../../styles/breakpoints';
import Header from './Header';
import Footer from './Footer';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 1.5rem;
  max-width: 75rem;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media ${device.tablet} {
    max-width: 100%;
    padding: 1.25rem 0.75rem;
  }
  @media ${device.mobile} {
    padding: 0.75rem 0.25rem;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
      {!hideFooter && <Footer />}
    </LayoutContainer>
  );
};

export default Layout;

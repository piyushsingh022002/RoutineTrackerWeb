import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { device } from '../../styles/breakpoints';
const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.5rem;
  background-color: #f8f9fa;
  margin-top: auto;
  width: 100%;
  box-sizing: border-box;
  @media ${device.tablet} {
    padding: 1.25rem 0.75rem;
  }
  @media ${device.mobile} {
    padding: 0.75rem 0.25rem;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 75rem;
  margin-bottom: 1.5rem;
  gap: 2rem;
  @media ${device.tablet} {
    flex-direction: column;
    gap: 2rem;
    max-width: 100%;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const FooterLink = styled(motion.a)`
  color: #555;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #4a6cf7;
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: #777;
  font-size: 0.9rem;
  width: 100%;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Intern Routine Tracker</FooterTitle>
          <p>Track your daily activities, create notes, and build productive habits.</p>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink 
            href="/dashboard"
            whileHover={{ x: 5 }}
          >
            Dashboard
          </FooterLink>
          <FooterLink 
            href="/notes/new"
            whileHover={{ x: 5 }}
          >
            Create Note
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink 
            href="https://reactjs.org" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
          >
            React
          </FooterLink>
          <FooterLink 
            href="https://dotnet.microsoft.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
          >
            .NET
          </FooterLink>
          <FooterLink 
            href="https://www.mongodb.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
          >
            MongoDB
          </FooterLink>
        </FooterSection>
      </FooterContent>

      <Copyright>
        &copy; {currentYear} Intern Routine Tracker. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;

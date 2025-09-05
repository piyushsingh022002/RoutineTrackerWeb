import React from 'react';
import styled from 'styled-components';
import { device } from '../styles/breakpoints';

const AboutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0.5rem 1.5rem 0.5rem;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
  box-sizing: border-box;
  @media ${device.tablet} {
    padding: 3rem 1.5rem 2rem 1.5rem;
  }
`;

const AboutHeader = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const AboutTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #4a6cf7;
  margin-bottom: 0.5rem;
  @media ${device.tablet} {
    font-size: 3rem;
  }
`;

const AboutSubtitle = styled.p`
  font-size: 1.2rem;
  color: #222;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const AboutSection = styled.section`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(74,108,247,0.07);
  padding: 2rem 1.5rem;
  margin-bottom: 2rem;
  max-width: 700px;
  width: 100%;
  transition: box-shadow 0.3s, transform 0.3s, background 0.3s;
  @media ${device.mobile} {
    padding: 1.25rem 0.75rem;
  }
  &:hover {
    box-shadow: 0 6px 24px rgba(74,108,247,0.13);
    transform: translateY(-4px) scale(1.015);
    background: #f3f6fd;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #4a6cf7;
  margin-bottom: 0.75rem;
`;

const SectionText = styled.p`
  color: #333;
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
`;

const ValuesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ValueItem = styled.li`
  background: #f1f5fd;
  color: #4a6cf7;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
  box-shadow: 0 1px 4px rgba(74,108,247,0.04);
  transition: background 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  &:hover {
    background: #e0e7ff;
    color: #222;
    transform: scale(1.07) rotate(-2deg);
    box-shadow: 0 4px 16px rgba(74,108,247,0.10);
  }
`;


const StyledLink = styled.a`
  color: #4a6cf7;
  text-decoration: underline;
  font-weight: 500;
  transition: color 0.25s, text-shadow 0.25s;
  &:hover {
    color: #1d4ed8;
    text-shadow: 0 2px 8px #e0e7ff;
    text-decoration: underline wavy;
  }
`;

const AboutFooter = styled.footer`
  margin-top: 2.5rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.95rem;
`;
const AboutIRTPage: React.FC = () => {
    return (
        <AboutContainer>
            <AboutHeader>
                <AboutTitle>About IRT</AboutTitle>
                <AboutSubtitle>Innovating Reliable Technologies</AboutSubtitle>
            </AboutHeader>

            <AboutSection>
                <SectionTitle>Our Mission</SectionTitle>
                <SectionText>
                    At IRT, our mission is to deliver cutting-edge technology solutions that empower businesses and communities.
                    We are committed to innovation, reliability, and transparency in everything we do.
                </SectionText>
            </AboutSection>

            <AboutSection>
                <SectionTitle>Who We Are</SectionTitle>
                <SectionText>
                    Founded in 2020, IRT is a team of engineers, designers, and thinkers passionate about solving real-world
                    problems through scalable software and hardware systems.
                </SectionText>
            </AboutSection>

            <AboutSection>
                <SectionTitle>Our Values</SectionTitle>
                <ValuesList>
                    <ValueItem>🚀 Innovation</ValueItem>
                    <ValueItem>✅ Reliability</ValueItem>
                    <ValueItem>🔍 Transparency</ValueItem>
                    <ValueItem>🌱 Sustainability</ValueItem>
                </ValuesList>
            </AboutSection>

            <AboutSection>
                <SectionTitle>Meet the Team</SectionTitle>
        <SectionText>
          Our diverse team combines deep technical expertise with creative vision. Learn more on our{' '}
          <StyledLink href="/team">Team Page</StyledLink>.
        </SectionText>
            </AboutSection>

            <AboutSection>
                <SectionTitle>Meet the Admin</SectionTitle>
        <SectionText>
          Behind the scenes, our admin ensures everything runs smoothly — from operations to innovation.
          Explore their work and leadership style on the{' '}
          <StyledLink href="/admin-portfolio">
            Reach Admin Portfolio Here
          </StyledLink>.
        </SectionText>
            </AboutSection>
            <AboutFooter>
                &copy; {new Date().getFullYear()} IRT Technologies. All rights reserved.
            </AboutFooter>
        </AboutContainer>
    );
};

export default AboutIRTPage;

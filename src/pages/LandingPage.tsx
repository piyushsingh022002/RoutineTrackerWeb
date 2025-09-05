import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { device } from '../styles/breakpoints';
import Header from '../components/common/Header';

const LandingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem;
  box-sizing: border-box;
  @media ${device.tablet} {
    padding: 2rem 1rem;
  }
  @media ${device.laptop} {
    padding: 3rem 2rem;
  }
`;



// const Hero = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   padding: 2rem;
//   max-width: 800px;
//   margin: 0 auto;
// `;

// updated css for Hero section

const Hero = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 0.5rem;
  width: 100%;
  @media ${device.tablet} {
    padding: 2rem 1rem;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  @media ${device.tablet} {
    font-size: 3rem;
  }
  @media (min-width: 1024px) {
    font-size: 4rem;
  }
  .highlight {
    color: rgb(64, 175, 230);
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1rem;
  color: var(--text-light);
  margin-bottom: 2.5rem;
  width: 100%;
  @media ${device.tablet} {
    font-size: 1.25rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  justify-content: center;
  flex-wrap: wrap;
  @media ${device.mobile} {
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
`;

const PrimaryButton = styled(Link)`
 /* padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--radius);
  font-weight: 500;
  transition: var(--transition);

  &:hover {
    background-color: var(--primary-hover);
    color: white;
  }*/
/*Updated css for PrimaryButton*/
    padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--radius);
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  position: relative;

  &:hover {
    background-color: white;
    color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
  }

  span.icon {
    transform: translateX(-10px);
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover span.icon {
    transform: translateX(0);
    opacity: 1;
  }
`;

const SecondaryButton = styled(Link)`
 /* padding: 0.75rem 1.5rem;
  background-color: white;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: var(--radius);
  font-weight: 500;
  transition: var(--transition);

  &:hover {
    background-color: rgba(79, 70, 229, 0.1);
  }*/
  /*Updated css for SecondaryButton*/

  
  padding: 0.75rem 1.5rem;
background-color: white;
color: var(--primary-color);
border: 1px solid var(--primary-color);
border-radius: var(--radius);
font-weight: 500;
transition: all 0.3s ease;
display: inline-flex;
align-items: center;
gap: 0.5rem;
overflow: hidden;

&:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.15);
}

span.icon {
  transform: translateX(-10px);
  opacity: 0;
  transition: all 0.3s ease;
}

&:hover span.icon {
  transform: translateX(0);
  opacity: 1;
}
`;

const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  @media ${device.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

/*const FeatureCard = styled(motion.div)`
  background-color: white;
  padding: 1.5rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: var(--text-light);
  font-size: 0.875rem;
`;
*/

/* updated code for the feature cards */

const FeatureIcon = styled.div`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.2);
    filter: brightness(1.3);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
`;

const FeatureDescription = styled.p`
  color: var(--text-light);
  font-size: 0.875rem;
  transition: color 0.3s ease;
`;

const FeatureCard = styled(motion.div)`
  background-color: white;
  padding: 1.25rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  border: 1px solid transparent;
  transition: var(--transition), background-color 0.3s ease, color 0.3s ease, border 0.3s ease;
  @media ${device.mobile} {
    padding: 0.75rem;
  }
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-5px);
    background-color: #f5f5f5;
    color: #f0f0f0;
    border: 1px solid rgb(64, 175, 230);
  }
  &:hover ${FeatureTitle},
  &:hover ${FeatureDescription} {
    color:rgb(64, 175, 230);
  }
  &:hover ${FeatureIcon} {
    animation: popIcon 0.6s ease forwards;
  }
`;


// Add keyframes animation for icon bounce/pop
const GlobalStyle = createGlobalStyle`
  @keyframes popIcon {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }
`;




const Footer = styled.footer`
  padding: 1.5rem 0.5rem;
  text-align: center;
  background-color: var(--bg-light);
  border-top: 1px solid var(--border-color);
  color: var(--text-light);
  font-size: 0.875rem;
  @media ${device.tablet} {
    padding: 2rem 1rem;
  }
`;

const LandingPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const featureItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <LandingContainer>
  <Header />

      <Hero>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <HeroTitle variants={itemVariants}>
            Track Your Daily <span className="highlight">Progress</span> as an Intern
          </HeroTitle>
          <HeroSubtitle variants={itemVariants}>
            A simple yet powerful tool to keep track of your daily activities, notes, and progress during your internship journey.
          </HeroSubtitle>
          <ButtonGroup variants={itemVariants}>
            <PrimaryButton to="/register">Get Started
            {/*Updated css for PrimaryButton*/}
            <span className="icon">🚀</span></PrimaryButton>
            <SecondaryButton to="/login">Sign In
            {/*Updated css for SecondaryButton*/}
            <span className="icon">🔒</span></SecondaryButton>
          </ButtonGroup>

          <FeatureGrid variants={featureVariants}>
            <GlobalStyle />
            <FeatureCard variants={featureItemVariants}>
              <FeatureIcon>📝</FeatureIcon>
              <FeatureTitle>Daily Notes</FeatureTitle>
              <FeatureDescription>
                Keep track of your daily activities, learnings, and achievements with easy-to-use note-taking.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard variants={featureItemVariants}>
              <FeatureIcon>🔔</FeatureIcon>
              <FeatureTitle>Smart Reminders</FeatureTitle>
              <FeatureDescription>
                Never miss a day with our intelligent reminder system that helps you stay consistent.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard variants={featureItemVariants}>
              <FeatureIcon>📊</FeatureIcon>
              <FeatureTitle>Progress Tracking</FeatureTitle>
              <FeatureDescription>
                Visualize your consistency and progress with intuitive dashboards and statistics.
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </motion.div>
      </Hero>

      <Footer>
        &copy; {new Date().getFullYear()} InternRoutineTracker. All rights reserved. Piyush Singh !!
      </Footer>
    </LandingContainer>
  );
};

export default LandingPage;

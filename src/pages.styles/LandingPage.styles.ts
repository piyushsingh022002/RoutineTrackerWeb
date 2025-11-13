import { device } from "../styles/breakpoints";
import styled from "styled-components";
import { motion } from "framer-motion";
import Button from "../components/common/Button";

const NotesIconsRow = styled(motion.div)`
  display: flex;
  gap: 1.7rem;
  justify-content: center;
  align-items: center;
  margin-top: 2.8rem;
  margin-bottom: 0.2rem;
  flex-wrap: wrap;
  @media ${device.mobile} {
    gap: 1rem;
    margin-top: 1.5rem;
  }
`;

const Hero = styled(motion.div)`
  width: 100%;
  min-height: calc(100vh - var(--header-height, 88px));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: calc(var(--header-height, 88px) + 2rem) 0.5rem 2rem 0.5rem;
  background: transparent;
  transition: box-shadow 0.3s, background 0.3s;
  border-radius: 24px;
  box-shadow: none;
  margin-top: 1rem;
  box-sizing: border-box;
  &:hover {
    background: rgba(230, 242, 255, 0.5);
    box-shadow: 0 8px 32px rgba(74,108,247,0.13);
    transform: scale(1.01);
  }
  @media ${device.tablet} {
    padding: calc(var(--header-height, 72px) + 2rem) 1rem 2rem 1rem;
  }
  @media ${device.mobile} {
    padding: calc(var(--header-height, 64px) + 1.5rem) 0.5rem 1.5rem 0.5rem;
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

const PrimaryButton = styled(Button)`
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


// Mock images
const mockImages = [
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
];

const Section = styled(motion.section)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  margin: 3rem 2rem;
  padding: 1.5rem;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(74,108,247,0.13);
  overflow: hidden;
  transition: box-shadow 0.3s, background 0.3s, transform 0.3s;
  position: relative;
  min-height: 320px;
  @media ${device.tablet} {
    flex-direction: column;
    gap: 1.5rem;
    margin: 2rem 0;
  }
  &:hover {
    box-shadow: 0 12px 36px rgba(74,108,247,0.22);
    background: linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%);
    transform: scale(1.015);
  }
`;

const SectionText = styled(motion.div)`
  flex: 1;
  min-width: 260px;
  padding: 2.2rem 2rem;
  margin: 0.5rem 0;
  transition: box-shadow 0.25s, transform 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Poppins', 'Inter', 'Nunito', Arial, sans-serif;
`;

const SectionImage = styled(motion.img)`
  flex: 1;
  max-width: 340px;
  width: 100%;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(74,108,247,0.13);
  object-fit: cover;
  transition: opacity 0.7s, transform 0.7s, box-shadow 0.3s;
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  @media ${device.mobile} {
    max-width: 100%;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #4a6cf7;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #222;
  margin-bottom: 1.2rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const FeatureItem = styled.li`
  font-size: 1.08rem;
  color: #222;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 500;
`;

export {
  NotesIconsRow,
  Hero,
  HeroTitle,
  HeroSubtitle,
  ButtonGroup,
  PrimaryButton,
  Footer,
  mockImages,
  Section,
  SectionText,
  SectionImage,
  SectionTitle,
  SectionSubtitle,
  FeatureList,
  FeatureItem,
};
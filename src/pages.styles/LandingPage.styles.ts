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
  padding: calc(var(--header-height, 65px) + 2.25rem) 0.75rem 2.25rem 0.75rem;
  background:
    radial-gradient(circle at 18% 20%, rgba(79,70,229,0.07), transparent 40%),
    radial-gradient(circle at 82% 8%, rgba(16,185,129,0.06), transparent 38%),
    #f8fafc;
  transition: box-shadow 0.3s, background 0.3s;
  border-radius: 24px;
  box-shadow: none;
  margin-top: 1rem;
  box-sizing: border-box;
  
  .dark & {
    background:
      radial-gradient(circle at 18% 20%, rgba(99,102,241,0.15), transparent 40%),
      radial-gradient(circle at 82% 8%, rgba(16,185,129,0.12), transparent 38%),
      #1a1d2e;
  }
  
  &:hover {
    background:
      radial-gradient(circle at 18% 20%, rgba(79,70,229,0.08), transparent 42%),
      radial-gradient(circle at 82% 8%, rgba(16,185,129,0.08), transparent 40%),
      #f9fafb;
    box-shadow: 0 16px 48px rgba(15,23,42,0.12);
    transform: translateY(-4px);
    
    .dark & {
      background:
        radial-gradient(circle at 18% 20%, rgba(99,102,241,0.18), transparent 42%),
        radial-gradient(circle at 82% 8%, rgba(16,185,129,0.15), transparent 40%),
        #1f2337;
      box-shadow: 0 16px 48px rgba(0,0,0,0.4);
    }
  }
  @media ${device.tablet} {
    padding: calc(var(--header-height, 72px) + 2rem) 1rem 2rem 1rem;
  }
  @media ${device.mobile} {
    padding: calc(var(--header-height, 64px) + 1.5rem) 0.5rem 1.5rem 0.5rem;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 2.1rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #0f172a;
  
  .dark & {
    color: #f1f5f9;
  }
  
  @media ${device.tablet} {
    font-size: 3rem;
  }
  @media (min-width: 1024px) {
    font-size: 4rem;
  }
  .highlight {
    background: linear-gradient(120deg, #0ea5e9 0%, #22c55e 50%, #4f46e5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    .dark & {
      background: linear-gradient(120deg, #38bdf8 0%, #4ade80 50%, #818cf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.15rem;
  color: #475569;
  margin-bottom: 2.25rem;
  margin-top: 0.25rem;
  width: 100%;
  
  .dark & {
    color: #cbd5e1;
  }
  
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
  padding: 0.85rem 1.6rem;
  background: linear-gradient(120deg, #4f46e5 0%, #4338ca 45%, #0ea5e9 100%);
  color: #f8fafc;
  border-radius: 14px;
  font-weight: 700;
  letter-spacing: 0.01em;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(15, 23, 42, 0.06);

  .dark & {
    background: linear-gradient(120deg, #6366f1 0%, #4f46e5 45%, #0ea5e9 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #f1f5f9;
  }

  &:hover {
    background: #ffffff;
    color: #111827;
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
    
    .dark & {
      background: #1e293b;
      color: #f1f5f9;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
    }
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
  
  .dark & {
    background-color: #1e293b;
    border-top: 1px solid rgba(255,255,255,0.1);
    color: #94a3b8;
  }
  
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
  background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f9fafb 100%);
  border-radius: 26px;
  box-shadow: 0 16px 40px rgba(15,23,42,0.08);
  border: 1px solid rgba(15,23,42,0.06);
  overflow: hidden;
  transition: box-shadow 0.3s, background 0.3s, transform 0.3s;
  position: relative;
  min-height: 320px;
  
  .dark & {
    background: linear-gradient(135deg, #1e293b 0%, #1a2332 50%, #1e293b 100%);
    box-shadow: 0 16px 40px rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.1);
  }
  
  @media ${device.tablet} {
    flex-direction: column;
    gap: 1.5rem;
    margin: 2rem 0;
  }
  &:hover {
    box-shadow: 0 22px 54px rgba(15,23,42,0.14);
    background: linear-gradient(135deg, #eef2ff 0%, #f9fafb 100%);
    transform: translateY(-4px);
    
    .dark & {
      box-shadow: 0 22px 54px rgba(0,0,0,0.5);
      background: linear-gradient(135deg, #1f2937 0%, #1e293b 100%);
    }
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
  color: #0f172a;
  
  .dark & {
    color: #e2e8f0;
  }
`;

const SectionImage = styled(motion.img)`
  flex: 1;
  max-width: 340px;
  width: 100%;
  border-radius: 18px;
  box-shadow: 0 12px 30px rgba(15,23,42,0.12);
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
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  
  .dark & {
    color: #f1f5f9;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1rem;
  color: #475569;
  margin-bottom: 1.2rem;
  
  .dark & {
    color: #cbd5e1;
  }
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
  font-size: 1.02rem;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 500;
  
  .dark & {
    color: #e2e8f0;
  }
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
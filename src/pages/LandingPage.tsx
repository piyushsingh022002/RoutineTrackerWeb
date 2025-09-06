import { device } from "../styles/breakpoints";
import { Button, Header } from "../components/common";
import { motion } from "framer-motion";
import styled from "styled-components";
import React, { useState } from "react";

// Notes-related icons for hero section
const notesIcons = [
  '📝', '📒', '📓', '📔', '📕', '📗', '📘', '📙', '📚', '🗒️', '✏️', '📄', '📑', '📂', '🗂️'
];

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
const BottomCTASection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3rem 0 2rem 0;
  padding: 2rem 1rem;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(74,108,247,0.13);
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
  margin-top: 0;
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
          <PrimaryButton
            type="button"
            onClick={handleRegister}
            disabled={isSaving}
            onMouseEnter={() => setIsRegisterHovered(true)}
            onMouseLeave={() => setIsRegisterHovered(false)}
          >
            Get Started <span className="icon">🚀</span>
          </PrimaryButton>
          <PrimaryButton
            type="button"
            onClick={handleLogin}
            disabled={isSaving}
            onMouseEnter={() => setIsLoginHovered(true)}
            onMouseLeave={() => setIsLoginHovered(false)}
          >
            Login <span className="icon">🔑</span>
          </PrimaryButton>
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




const LandingPage: React.FC = () => {
  const [isRegisterHovered, setIsRegisterHovered] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleRegister = () => {
    // You can add analytics, loading, or navigation logic here
    window.location.href = "/register";
  };

  const handleLogin = () => {
    // You can add analytics, loading, or navigation logic here
    window.location.href = "/login";
  };

  return (
    <>
      <Header />
        {/* Hero Section */}
        <Hero>
          <HeroTitle>
            Your Notes, Your Way—<span className="highlight">Secure, Shareable, and Smart.</span>
          </HeroTitle>
          <HeroSubtitle>
            Enjoy total freedom and control over your notes—write, organize, and share on your terms.
          </HeroSubtitle>
          <ButtonGroup>
            <PrimaryButton
              type="button"
              onClick={handleRegister}
              disabled={isSaving}
              onMouseEnter={() => setIsRegisterHovered(true)}
              onMouseLeave={() => setIsRegisterHovered(false)}
            >
              Get Started <span className="icon">🚀</span>
            </PrimaryButton>
            <PrimaryButton
              type="button"
              onClick={handleLogin}
              disabled={isSaving}
              onMouseEnter={() => setIsLoginHovered(true)}
              onMouseLeave={() => setIsLoginHovered(false)}
            >
              Login <span className="icon">🔑</span>
            </PrimaryButton>
          </ButtonGroup>
          <NotesIconsRow
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                },
              },
            }}
          >
            {notesIcons.map((icon, idx) => (
              <motion.span
                key={icon + idx}
                variants={{
                  hidden: { opacity: 0, y: 18, scale: 0.7 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 18 } },
                }}
                whileHover={{ scale: 1.25, rotate: [0, 8, -8, 0] }}
                style={{ fontSize: '2.8rem', cursor: 'pointer', userSelect: 'none', filter: 'drop-shadow(0 2px 8px #e0e7ff)' }}
              >
                {icon}
              </motion.span>
            ))}
          </NotesIconsRow>
        </Hero>

        {/* Core Features */}
        <div style={{ height: '40px' }} />
        <Section>
          <SectionText>
            <div>
              <SectionTitle>Everything You Need to Note Smarter</SectionTitle>
              <FeatureList>
                <FeatureItem>✍️ <b>Write & Organize</b> – Effortlessly jot down ideas, tasks, and plans in a clean, distraction-free space.</FeatureItem>
                <FeatureItem>📎 <b>Attach Anything</b> – Instantly add images, PDFs, or Word files to keep all your info together.</FeatureItem>
                <FeatureItem>💾 <b>Flexible Saving</b> – Save to your account for access anywhere, or just download and go—no sign-in needed.</FeatureItem>
                <FeatureItem>📤 <b>Export Anytime</b> – Download your notes as PDF, Word, or plain text in one click.</FeatureItem>
                <FeatureItem>📧 <b>Email Directly</b> – Send notes to yourself or your team without leaving the app.</FeatureItem>
              </FeatureList>
            </div>
          </SectionText>
          <SectionImage
            src={mockImages[0]}
            alt="Core Features"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          />
        </Section>

        {/* Privacy First */}
        <Section style={{ flexDirection: 'row-reverse' }}>
          <SectionText>
            <div>
              <SectionTitle>Your Privacy, Your Choice</SectionTitle>
              <SectionSubtitle>
                <b>Full Control</b> – Save notes to your account for easy access, or keep them private and download instantly. <br />
                <b>No Forced Storage</b> – Write, export, or email notes without leaving a trace—your data, your rules.
              </SectionSubtitle>
            </div>
          </SectionText>
          <SectionImage
            src={mockImages[1]}
            alt="Privacy First"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          />
        </Section>

        {/* Collaboration & Teams */}
        <Section>
          <SectionText>
            <div>
              <SectionTitle>Work Together, Instantly</SectionTitle>
              <FeatureList>
                <FeatureItem>👥 <b>Create Teams</b> – Set up shared spaces for projects, study groups, or departments.</FeatureItem>
                <FeatureItem>📝 <b>Real-Time Sharing</b> – Everyone sees updates as they happen—no refresh needed.</FeatureItem>
                <FeatureItem>🔄 <b>Seamless Updates</b> – Stay in sync, whether you’re at your desk or on the go.</FeatureItem>
              </FeatureList>
            </div>
          </SectionText>
          <SectionImage
            src={mockImages[2]}
            alt="Collaboration & Teams"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          />
        </Section>

        {/* Why Choose Us */}
        <Section style={{ flexDirection: 'row-reverse' }}>
          <SectionText>
            <div>
              <SectionTitle>Why You'll Love It</SectionTitle>
              <FeatureList>
                <FeatureItem>🚀 <b>Lightning Fast</b> – Get things done with minimal clicks and zero clutter.</FeatureItem>
                <FeatureItem>🔒 <b>Truly Secure</b> – Your notes are always private and protected.</FeatureItem>
                <FeatureItem>🌍 <b>Flexible for All</b> – Perfect for students, freelancers, teams, and businesses.</FeatureItem>
                <FeatureItem>🎯 <b>Business Ready</b> – Lightweight, powerful, and ready for your next big project.</FeatureItem>
              </FeatureList>
            </div>
          </SectionText>
          <SectionImage
            src={mockImages[3]}
            alt="Why Choose Us"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          />
        </Section>
        {/* Core Features */}
        <Section>
          <SectionText>
            <div>
              <SectionTitle>Everything You Need to Note Smarter</SectionTitle>
              <FeatureList>
                <FeatureItem>✍️ <b>Write & Organize</b> – Effortlessly jot down ideas, tasks, and plans in a clean, distraction-free space.</FeatureItem>
                <FeatureItem>📎 <b>Attach Anything</b> – Instantly add images, PDFs, or Word files to keep all your info together.</FeatureItem>
                <FeatureItem>💾 <b>Flexible Saving</b> – Save to your account for access anywhere, or just download and go—no sign-in needed.</FeatureItem>
                <FeatureItem>📤 <b>Export Anytime</b> – Download your notes as PDF, Word, or plain text in one click.</FeatureItem>
                <FeatureItem>📧 <b>Email Directly</b> – Send notes to yourself or your team without leaving the app.</FeatureItem>
              </FeatureList>
            </div>
          </SectionText>
          <SectionImage
            src={mockImages[0]}
            alt="Core Features"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          />
        </Section>

        {/* Privacy First */}
        <Section style={{ flexDirection: 'row-reverse' }}>
          <SectionText>
            <div>
              <SectionTitle>Your Privacy, Your Choice</SectionTitle>
              <SectionSubtitle>
                <b>Full Control</b> – Save notes to your account for easy access, or keep them private and download instantly. <br />
                <b>No Forced Storage</b> – Write, export, or email notes without leaving a trace—your data, your rules.
              </SectionSubtitle>
            </div>
          </SectionText>
          <SectionImage
            src={mockImages[1]}
            alt="Privacy First"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          />
        </Section>

        {/* Collaboration & Teams */}
        <Section>
          <SectionText>
            <div>
              <SectionTitle>Work Together, Instantly</SectionTitle>
              <FeatureList>
                <FeatureItem>👥 <b>Create Teams</b> – Set up shared spaces for projects, study groups, or departments.</FeatureItem>
                <FeatureItem>📝 <b>Real-Time Sharing</b> – Everyone sees updates as they happen—no refresh needed.</FeatureItem>
                <FeatureItem>🔄 <b>Seamless Updates</b> – Stay in sync, whether you’re at your desk or on the go.</FeatureItem>
              </FeatureList>
            </div>
          </SectionText>
          <SectionImage
            src={mockImages[2]}
            alt="Collaboration & Teams"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          />
        </Section>

        {/* Why Choose Us */}
        <Section style={{ flexDirection: 'row-reverse' }}>
          <SectionText>
            <div>
              <SectionTitle>Why You'll Love It</SectionTitle>
              <FeatureList>
                <FeatureItem>🚀 <b>Lightning Fast</b> – Get things done with minimal clicks and zero clutter.</FeatureItem>
                <FeatureItem>🔒 <b>Truly Secure</b> – Your notes are always private and protected.</FeatureItem>
                <FeatureItem>🌍 <b>Flexible for All</b> – Perfect for students, freelancers, teams, and businesses.</FeatureItem>
                <FeatureItem>🎯 <b>Business Ready</b> – Lightweight, powerful, and ready for your next big project.</FeatureItem>
              </FeatureList>
            </div>
          </SectionText>
          <SectionImage
            src={mockImages[3]}
            alt="Why Choose Us"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          />
        </Section>

        <Section style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '0.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#4a6cf7', marginBottom: 0 }}>
            Ready to get started?
          </h2>
          <div style={{ color: '#222', fontSize: '1.1rem', marginBottom: 0, maxWidth: 520 }}>
            Try the app without logging in!
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.2rem' }}>
            <Button variant="outline" size="medium">
              Try Without Login
            </Button>
          </div>
        </Section>
        <Footer>
          &copy; {new Date().getFullYear()} InternRoutineTracker. All rights reserved. Piyush Singh !!
        </Footer>
    </>
  );
}
export default LandingPage;

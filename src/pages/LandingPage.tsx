
import { Button, Header } from "../components/common";
import { motion } from "framer-motion";
import {
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
} from "../pages.styles/LandingPage.styles";

import { useNavigate } from "react-router-dom";
// import React, { useState } from "react";

// Notes-related icons for hero section
const notesIcons = [
  '📝', '📒', '📕', '📔','📓' , '📗','📂' , '📙', '📚', '🗒️', '✏️', '📄', '📑', '📘', '🗂️'
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  // const [isRegisterHovered, setIsRegisterHovered] = useState(false);
  // const [isLoginHovered, setIsLoginHovered] = useState(false);
  // const [isSaving, setIsSaving] = useState(false);

  const handleRegister = () => {
    // You can add analytics, loading, or navigation logic here
    
    navigate("/register");
  };

  const handleLogin = () => {
    // You can add analytics, loading, or navigation logic here
    navigate("/login");
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
          // disabled={isSaving}
          // onMouseEnter={() => setIsRegisterHovered(true)}
          // onMouseLeave={() => setIsRegisterHovered(false)}
          >
            Get Started <span className="icon">🚀</span>
          </PrimaryButton>
          <PrimaryButton
            type="button"
            onClick={handleLogin}
          // disabled={isSaving}
          // onMouseEnter={() => setIsLoginHovered(true)}
          // onMouseLeave={() => setIsLoginHovered(false)}
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

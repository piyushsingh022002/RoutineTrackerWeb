import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const RegisterContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 18% 12%, rgba(79,70,229,0.06), transparent 35%),
    radial-gradient(circle at 82% 8%, rgba(17,24,39,0.05), transparent 40%),
    #f8fafc;
  padding: 4rem 0.75rem;
  box-sizing: border-box;
  overflow-y: auto;
  
  .dark & {
    background: radial-gradient(circle at 18% 12%, rgba(99,102,241,0.15), transparent 35%),
      radial-gradient(circle at 82% 8%, rgba(79,70,229,0.12), transparent 40%),
      #0f172a;
  }
`;

export const RegisterCard = styled(motion.div)`
  max-width: 500px;
  width: 100%;
  background-color: #fffffffa;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
  padding: 2rem 2.1rem 1.7rem;
  box-sizing: border-box;
  position: relative;
  overflow: visible;
  margin: 2rem 0;

  .dark & {
    background-color: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(120deg, #4f46e5 0%, #4338ca 50%, #312e81 100%);
  }

  @media (max-height: 800px) {
    padding: 1.5rem 2rem 1rem;
  }
`;

export const HeaderSection = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const Logo = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(120deg, #111827 0%, #4338ca 45%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Title = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0.5rem 0 0.9rem;
  letter-spacing: -0.01em;
  
  .dark & {
    color: #f1f5f9;
  }
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #475569;
  margin-bottom: 0.9rem;
  
  .dark & {
    color: #cbd5e1;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #1f2937;
`;

export const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.98rem;
  transition: all 0.2s ease;
  background-color: #f8fafc;
  color: #0f172a;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.18);
    background-color: white;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export const AlertBox = styled(motion.div)`
  background-color: #fed7d7;
  border-left: 4px solid #e53e3e;
  color: #c53030;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius);
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

export const SubmitButton = styled(motion.button)`
  padding: 0.9rem;
  background: linear-gradient(120deg, #4f46e5 0%, #4338ca 50%, #312e81 100%);
  color: #f8fafc;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1.02rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.25rem;
  box-shadow: 0 12px 30px rgba(79, 70, 229, 0.25);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 36px rgba(67, 56, 202, 0.3);
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const SignInText = styled.div`
  text-align: center;
  font-size: 0.95rem;
  margin-top: 1.3rem;
  color: #4b5563;
`;

export const SignInLink = styled(Link)`
  color: #4f46e5;
  font-weight: 700;
  margin-left: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    color: #312e81;
    text-decoration: underline;
  }
`;

export const TopRightAction = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
`;

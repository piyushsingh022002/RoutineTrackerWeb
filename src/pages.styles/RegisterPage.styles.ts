import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const RegisterContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
  padding: 5rem 0;
  box-sizing: border-box;
  overflow-y: auto;
`;

export const RegisterCard = styled(motion.div)`
  max-width: 500px;
  width: 100%;
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem 2rem 1.5rem;
  box-sizing: border-box;
  position: relative;
  overflow: visible;
  margin: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, var(--primary-color), #4facfe);
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
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0.5rem 0 1rem;
`;

export const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.75rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  font-size: 0.875rem;
  font-weight: 500;
  color: #444;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background-color: #f8fafc;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
    background-color: white;
  }

  &::placeholder {
    color: #a0aec0;
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
  padding: 0.75rem;
  background: linear-gradient(90deg, var(--primary-color), #4facfe);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.25rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(66, 153, 225, 0.25);
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
  font-size: 0.9rem;
  margin-top: 1.25rem;
  color: #4a5568;
`;

export const SignInLink = styled(Link)`
  color: var(--primary-color);
  font-weight: 600;
  margin-left: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    color: #4facfe;
    text-decoration: underline;
  }
`;

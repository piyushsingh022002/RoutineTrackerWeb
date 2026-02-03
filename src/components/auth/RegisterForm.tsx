import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import type { RegisterCredentials } from '../../types';
import { Input, Alert, NotebookLoader } from '../common';
import {
  Logo,
  Title,
  Label,
  SubmitButton,
  SignUpText,
  SignUpLink,
} from '../../pages.styles/LoginPage.styles';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const ScrollableForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-height: 50vh;
  overflow-y: auto;
  padding-right: 0.5rem;
  margin-bottom: 1rem;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;
    
    &:hover {
      background: #a0aec0;
    }
  }
  
  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 transparent;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PasswordRequirements = styled.ul`
  font-size: 0.75rem;
  color: #6c757d;
  margin: -0.8rem 0 0 1.5rem;
  padding: 0;
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
`;

const RegisterForm: React.FC = () => {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dob: '',
    securityQuestion: '',
    securityAnswer: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [showEmailNotFoundMessage, setShowEmailNotFoundMessage] = useState(false);
  const { register, error, clearError, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-navigate to dashboard when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Check if coming from failed login attempt
  useEffect(() => {
    const state = location.state as { showMessage?: boolean; email?: string } | null;
    if (state?.showMessage && state.email) {
      setShowEmailNotFoundMessage(true);
      setCredentials((prev) => ({ ...prev, email: state.email as string }));
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (error) clearError();
    if (formError) setFormError(null);
  };

  const validateForm = (): boolean => {
    if (!credentials.fullName.trim()) {
      setFormError('Full name is required');
      return false;
    }

    if (!credentials.username.trim()) {
      setFormError('Username is required');
      return false;
    }
    
    if (!credentials.email.trim()) {
      setFormError('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setFormError('Please enter a valid email address');
      return false;
    }
    
    if (!credentials.dob) {
      setFormError('Date of birth is required');
      return false;
    }
    
    if (!credentials.password) {
      setFormError('Password is required');
      return false;
    }
    
    if (credentials.password.length < 8) {
      setFormError('Password must be at least 8 characters long');
      return false;
    }
    
    if (credentials.password !== credentials.confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await register(credentials);
      // Navigation will happen automatically when isAuthenticated becomes true
    } catch (err) {
      // Error is handled by the AuthContext
      console.error('Registration failed:', err);
    }
  };

  if (isLoading) {
    return (
      <LoaderWrapper>
        <NotebookLoader 
          message="Please wait, shortly" 
          subtext="Creating your account"
        />
      </LoaderWrapper>
    );
  }

  return (
    <FormContainer>
      <Logo>Record Tracker Web</Logo>
      <Title>Create your account, Start today</Title>
      
      {showEmailNotFoundMessage && (
        <Alert 
          variant="info" 
          message="Email not found, please register first to login" 
          onClose={() => setShowEmailNotFoundMessage(false)}
          autoClose={true}
          autoCloseTime={5000}
        />
      )}
      
      {(error || formError) && (
        <Alert 
          variant="error" 
          message={formError || error || 'An error occurred'} 
          onClose={() => {
            if (error) clearError();
            if (formError) setFormError(null);
          }}
        />
      )}
      
      <ScrollableForm>
        <FormGroup>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            name="fullName"
            value={credentials.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            fullWidth
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Choose a username"
            fullWidth
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="you@example.com"
            fullWidth
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            name="dob"
            value={credentials.dob}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            value={credentials.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number (optional)"
            fullWidth
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="securityQuestion">Security Question</Label>
          <Input
            id="securityQuestion"
            type="text"
            name="securityQuestion"
            value={credentials.securityQuestion}
            onChange={handleChange}
            placeholder="E.g., What's your pet's name? (optional)"
            fullWidth
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="securityAnswer">Security Answer</Label>
          <Input
            id="securityAnswer"
            type="text"
            name="securityAnswer"
            value={credentials.securityAnswer}
            onChange={handleChange}
            placeholder="Answer to your security question (optional)"
            fullWidth
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="••••••••"
            fullWidth
            required
          />
        </FormGroup>
        
        <PasswordRequirements>
          <li>At least 8 characters long</li>
          <li>Include uppercase and lowercase letters</li>
          <li>Include at least one number or special character</li>
        </PasswordRequirements>
        
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            fullWidth
            required
          />
        </FormGroup>
      </ScrollableForm>
      
      <ButtonGroup>
        <SubmitButton
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </SubmitButton>
        
        <SignUpText>
          Already have an account?
          <SignUpLink to="/login">Sign in</SignUpLink>
        </SignUpText>
      </ButtonGroup>
    </FormContainer>
  );
};

export default RegisterForm;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import type { RegisterCredentials } from '../../types';
import { Input, Alert, NotebookLoader } from '../common';
import SetPasswordForm from './SetPasswordForm';
// import { useGoogleLogin } from '@react-oauth/google';
// import googleLogo from '../../../Logos/google.webp';
import { GoogleLogin } from '@react-oauth/google';
import createIcon from '../../../Logos/create.svg';
import bookIcon from '../../../Logos/book.svg';
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

const BrandLogo = styled(Logo)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;

const StyledTitle = styled(Title)`
  margin-top: -0.5rem;
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

const GoogleButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CreateButton = styled(SubmitButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

// const GoogleButton = styled(SubmitButton)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
// `;

// const GoogleIcon = styled.img`
//   width: 18px;
//   height: 18px;
//   object-fit: contain;
//   flex-shrink: 0;
// `;

const CreateIcon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
  flex-shrink: 0;
`;

const BookIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldError = styled.div`
  color: #dc2626;
  font-size: 0.75rem;
  margin-top: -0.25rem;
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
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof RegisterCredentials, string>>
  >({});
  const [showEmailNotFoundMessage, setShowEmailNotFoundMessage] = useState(false);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [oauthData, setOauthData] = useState<{ email: string; tempToken: string } | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { register, googleAuth, setAuthToken, error, clearError, isLoading, isAuthenticated } = useAuth();
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
    if (fieldErrors[name as keyof RegisterCredentials]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof RegisterCredentials, string>> = {};

    if (!credentials.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!credentials.username.trim()) {
      errors.username = 'Username is required';
    }

    if (!credentials.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(credentials.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (!credentials.dob) {
      errors.dob = 'Date of birth is required';
    }

    if (!credentials.password) {
      errors.password = 'Password is required';
    } else if (credentials.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (!credentials.confirmPassword) {
      errors.confirmPassword = 'Confirm your password';
    } else if (credentials.password !== credentials.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
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

  //google login handler (placeholder for future implementation)
  // const loginWithGoogle = useGoogleLogin({
  //   flow: 'implicit',
  //   scope: 'openid email profile',

  //   onSuccess: async (res) => {
  //     try {
  //        if (res.credential) {
  //       // send ID token instead of access_token
  //       await googleAuth(res.credential);
  //     } else {
  //       console.error('Google did not return a credential.');
  //     }
  //     } catch (err) {
  //       console.error('Google authentication failed:', err);
  //     }
  //   },
  //   onError: () => {
  //     console.error('Google Sign Up Failed');
  //   },
  // });

  const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
    if (!credentialResponse.credential) {
      console.error('No credential received from Google.');
      return;
    }

    setGoogleLoading(true);

    try {
      // Decode Google JWT to extract email
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const googleUser = JSON.parse(jsonPayload);
      const userEmail = googleUser.email;

      const response = await googleAuth(credentialResponse.credential);
      
      console.log('Google auth response:', response);
      
      // Check if response contains a token (temp password token for setting password)
      if (response.token && response.message === 'success') {
        // User needs to set password - show SetPasswordForm
        console.log('Setting password form with email:', userEmail);
        setOauthData({
          email: userEmail,
          tempToken: response.token,
        });
        setShowSetPassword(true);
        setGoogleLoading(false);
      } else {
        // User is already registered and authenticated
        // Token should already be set by googleAuth
        setGoogleLoading(false);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Google authentication failed:', err);
      setGoogleLoading(false);
    }
  };

  const handleSetPasswordSuccess = (token: string) => {
    // Set the auth token and navigate to dashboard
    setAuthToken(token);
    navigate('/dashboard');
  };

  // Show SetPasswordForm if user logged in with Google and needs to set password
  if (showSetPassword && oauthData) {
    console.log('Rendering SetPasswordForm with:', oauthData);
    return (
      <SetPasswordForm
        email={oauthData.email}
        tempToken={oauthData.tempToken}
        onSuccess={handleSetPasswordSuccess}
      />
    );
  }

  if (isLoading && !showSetPassword) {
    return (
      <LoaderWrapper>
        <NotebookLoader 
          message="Please wait, shortly" 
          subtext="Creating your account"
        />
      </LoaderWrapper>
    );
  }

  if (googleLoading && !showSetPassword) {
    return (
      <LoaderWrapper>
        <NotebookLoader 
          message="Authenticating with Google" 
          subtext="Please wait..."
        />
      </LoaderWrapper>
    );
  }

  return (
    <FormContainer>
      <BrandLogo>
        <BookIcon src={bookIcon} alt="logo" />
        Record Tracker Web
      </BrandLogo>
      <StyledTitle>Create your account, Start today</StyledTitle>
      
      {showEmailNotFoundMessage && (
        <Alert 
          variant="info" 
          message="Email not found, please register first to login" 
          onClose={() => setShowEmailNotFoundMessage(false)}
          autoClose={true}
          autoCloseTime={5000}
        />
      )}
      
      {error && (
        <Alert 
          variant="error" 
          message={error || 'An error occurred'} 
          onClose={() => {
            if (error) clearError();
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
          {fieldErrors.fullName && <FieldError>{fieldErrors.fullName}</FieldError>}
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
          {fieldErrors.username && <FieldError>{fieldErrors.username}</FieldError>}
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
          {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
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
          {fieldErrors.dob && <FieldError>{fieldErrors.dob}</FieldError>}
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
          {fieldErrors.password && <FieldError>{fieldErrors.password}</FieldError>}
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
          {fieldErrors.confirmPassword && (
            <FieldError>{fieldErrors.confirmPassword}</FieldError>
          )}
        </FormGroup>
      </ScrollableForm>
      
      <ButtonGroup>
        <CreateButton
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          <CreateIcon src={createIcon} alt="Create" />
          {isLoading ? 'Creating account...' : 'Create account'}
        </CreateButton>
        {/* <GoogleButton
          type="button"
          onClick={() => loginWithGoogle()}
          // disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          <GoogleIcon src={googleLogo} alt="Google" />
          Sign up with Google
        </GoogleButton> */}

        <GoogleButtonWrapper>
          <GoogleLogin
            width="240"
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.error('Google Sign Up Failed');
            }}
            text="signup_with"
            shape="rectangular"
          />
        </GoogleButtonWrapper>
        <SignUpText>
          Already have an account?
          <SignUpLink to="/login">Sign in</SignUpLink>
        </SignUpText>
      </ButtonGroup>
    </FormContainer>
  );
};

export default RegisterForm;

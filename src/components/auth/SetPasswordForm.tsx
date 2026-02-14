import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Alert } from '../common';
import { setPasswordFromOAuth } from '../../services/authPasswordApi';
import {
  Logo,
  Title,
  Label,
  SubmitButton,
} from '../../pages.styles/LoginPage.styles';
import bookIcon from '../../../Logos/book.svg';

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

const BookIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
`;

const StyledTitle = styled(Title)`
  margin-top: -0.5rem;
`;

const Form = styled.form`
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

const FieldError = styled.div`
  color: #dc2626;
  font-size: 0.75rem;
  margin-top: -0.25rem;
`;

const PasswordRequirements = styled.ul`
  font-size: 0.75rem;
  color: #6c757d;
  margin: -0.5rem 0 0 1.5rem;
  padding: 0;
`;

interface SetPasswordFormProps {
  email: string;
  tempToken: string;
  onSuccess: (token: string) => void;
}

const SetPasswordForm: React.FC<SetPasswordFormProps> = ({ email, tempToken, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const errors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await setPasswordFromOAuth(email, tempToken, password);
      
      if (response.token) {
        // Store the token and navigate to dashboard
        onSuccess(response.token);
      } else {
        setError('Failed to set password. Please try again.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to set password. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <BrandLogo>
        <BookIcon src={bookIcon} alt="logo" />
        Record Tracker Web
      </BrandLogo>
      <StyledTitle>Set Your Password</StyledTitle>
      <p style={{ fontSize: '0.875rem', color: '#6c757d', marginTop: '-0.5rem', textAlign: 'center' }}>
        Please create a password for your account
      </p>

      {error && (
        <Alert 
          variant="error" 
          message={error} 
          onClose={() => setError(null)}
        />
      )}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (fieldErrors.password) {
                setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
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
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (fieldErrors.confirmPassword) {
                setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }
            }}
            placeholder="••••••••"
            fullWidth
            required
          />
          {fieldErrors.confirmPassword && (
            <FieldError>{fieldErrors.confirmPassword}</FieldError>
          )}
        </FormGroup>

        <SubmitButton
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          {isLoading ? 'Setting password...' : 'Set Password'}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default SetPasswordForm;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/common/Button';
import ROUTE_PATHS from '../routes/RoutePaths';
import { useAuth } from '../context/AuthContext';
import { resetPassword } from '../services/authPasswordApi';
import {
  NewPasswordContainer,
  NewPasswordCard,
  Logo,
  Title,
  Subtitle,
  Form,
  FormGroup,
  Label,
  Input,
  SuccessCodeInput,
  PasswordStrengthBar,
  PasswordStrengthText,
  ErrorMessage,
  SuccessMessage,
  UpdateButton,
  BackLink,
  TopRightAction,
} from '../pages.styles/NewPasswordPage.styles';

const NewPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Get email and successCode from previous page or sessionStorage
  const email = location.state?.email || sessionStorage.getItem('reset_email') || '';
  const [successCode] = useState(location.state?.successCode || sessionStorage.getItem('reset_successCode') || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if email or successCode is missing
  useEffect(() => {
    if (!email || !successCode) {
      navigate(ROUTE_PATHS.FORGOT_PASSWORD);
    }
  }, [email, successCode, navigate]);

  // Calculate password strength
  useEffect(() => {
    if (!newPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (newPassword.length >= 8) strength++;
    if (/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)) strength++;
    if (/[0-9]/.test(newPassword)) strength++;
    if (/[^a-zA-Z0-9]/.test(newPassword)) strength++;

    setPasswordStrength(strength);
  }, [newPassword]);

  const getStrengthLabel = () => {
    switch (passwordStrength) {
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  // Validation temporarily removed for testing flow

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: { newPassword?: string; confirmPassword?: string } = {};

    if (!newPassword) {
      newErrors.newPassword = 'Password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!email || !successCode) {
      newErrors.newPassword = 'Missing required information. Please start over.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const { token, email: userEmail } = await resetPassword(
        email,
        successCode,
        newPassword,
        confirmPassword
      );

      // Store token and update authenticated user state using existing login flow
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update auth state using the login mechanism
      await login({ email: userEmail, password: newPassword });

      // Clear session storage after successful reset
      sessionStorage.removeItem('reset_email');
      sessionStorage.removeItem('reset_successCode');

      // Redirect to Dashboard
      navigate(ROUTE_PATHS.DASHBOARD);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update password. Please try again.';
      setErrors({ newPassword: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <NewPasswordContainer>
      <TopRightAction data-cursor-block>
        <Button
          variant="outline"
          size="medium"
          shape="pill"
          type="button"
          onClick={() => navigate(ROUTE_PATHS.ROOT)}
        >
          Home
        </Button>
      </TopRightAction>
      
      <NewPasswordCard
        data-cursor-block
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>🔐 InternRoutineTracker</Logo>
        <Title>Create New Password</Title>
        <Subtitle>
          Your OTP has been verified. Now set a strong password for your account.
        </Subtitle>

        <SuccessMessage>
          OTP Verified Successfully
        </SuccessMessage>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="successCode">Verification Code</Label>
            <SuccessCodeInput
              id="successCode"
              type="text"
              value={successCode}
              disabled
              readOnly
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            {newPassword && (
              <>
                <PasswordStrengthBar strength={passwordStrength} />
                <PasswordStrengthText strength={passwordStrength}>
                  {getStrengthLabel()}
                </PasswordStrengthText>
              </>
            )}
            {errors.newPassword && <ErrorMessage>{errors.newPassword}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
            />
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          </FormGroup>

          <UpdateButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? 'Updating Password...' : '🔄 Update Password'}
          </UpdateButton>
        </Form>

        <BackLink href="/login">← Back to Login</BackLink>
      </NewPasswordCard>
    </NewPasswordContainer>
  );
};

export default NewPasswordPage;

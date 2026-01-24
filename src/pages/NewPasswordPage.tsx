import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import ROUTE_PATHS from '../routes/RoutePaths';
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
  
  // Pre-filled dummy success code
  const [successCode] = useState('ABC123XYZ');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Validation removed for testing
    // if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // TODO: Implement actual password update logic here
      console.log('Updating password with code:', successCode);
      console.log('New password:', newPassword);
      
      // Show success and redirect
      alert('Password updated successfully!');
      navigate(ROUTE_PATHS.LOGIN);
    } catch (error) {
      console.error('Failed to update password:', error);
      setErrors({ newPassword: 'Failed to update password. Please try again.' });
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

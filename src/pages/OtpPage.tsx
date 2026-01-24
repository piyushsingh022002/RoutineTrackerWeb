import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import ROUTE_PATHS from '../routes/RoutePaths';
import {
  OtpContainer,
  OtpCard,
  Logo,
  Title,
  Subtitle,
  Form,
  FormGroup,
  Label,
  RadioGroup,
  RadioOption,
  Input,
  CheckboxWrapper,
  ErrorMessage,
  SubmitButton,
  BackLink,
  TopRightAction,
} from '../pages.styles/OtpPage.style';

type ContactMethod = 'email' | 'phone';

const OtpPage: React.FC = () => {
  const navigate = useNavigate();
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email');
  const [contactValue, setContactValue] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<{ contact?: string; terms?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation temporarily removed for testing flow

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation removed for testing
    // if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // TODO: Implement actual OTP sending logic here
      console.log('Sending OTP to:', contactMethod, contactValue);
      
      // Navigate to OTP verification page
      navigate(ROUTE_PATHS.OTP_VERIFICATION);
    } catch (error) {
      console.error('Failed to send OTP:', error);
      setErrors({ contact: 'Failed to send OTP. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OtpContainer>
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
      
      <OtpCard
        data-cursor-block
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>🔐 InternRoutineTracker</Logo>
        <Title>Reset Your Password</Title>
        <Subtitle>
          We'll send you a one-time password to verify your identity and reset your password.
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Choose how to receive your OTP</Label>
            <RadioGroup>
              <RadioOption>
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={contactMethod === 'email'}
                  onChange={() => {
                    setContactMethod('email');
                    setContactValue('');
                    setErrors({});
                  }}
                />
                <span>📧 Email</span>
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  checked={contactMethod === 'phone'}
                  onChange={() => {
                    setContactMethod('phone');
                    setContactValue('');
                    setErrors({});
                  }}
                />
                <span>📱 Phone</span>
              </RadioOption>
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="contactValue">
              {contactMethod === 'email' ? 'Email Address' : 'Phone Number'}
            </Label>
            <Input
              id="contactValue"
              type={contactMethod === 'email' ? 'email' : 'tel'}
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              placeholder={
                contactMethod === 'email' 
                  ? 'you@example.com' 
                  : '+1 (555) 123-4567'
              }
            />
            {errors.contact && <ErrorMessage>{errors.contact}</ErrorMessage>}
          </FormGroup>

          <CheckboxWrapper>
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <span>
              I agree to receive an OTP for password reset and accept the{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </span>
          </CheckboxWrapper>
          {errors.terms && <ErrorMessage>{errors.terms}</ErrorMessage>}

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
          </SubmitButton>
        </Form>

        <BackLink href="/login">← Back to Login</BackLink>
      </OtpCard>
    </OtpContainer>
  );
};

export default OtpPage;

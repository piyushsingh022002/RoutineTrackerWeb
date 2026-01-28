import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/common/Button';
import ROUTE_PATHS from '../routes/RoutePaths';
import { verifyOtp, sendOtp } from '../services/authPasswordApi';
import {
  OtpVerificationContainer,
  OtpVerificationCard,
  Logo,
  Title,
  Subtitle,
  Form,
  OtpInputContainer,
  OtpInput,
  ErrorMessage,
  VerifyButton,
  ResendSection,
  ResendText,
  ResendButton,
  Timer,
  BackLink,
  TopRightAction,
} from '../pages.styles/OtpVerificationPage.styles';

const OtpVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || sessionStorage.getItem('reset_email') || '';
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if no email found
  useEffect(() => {
    if (!email) {
      navigate(ROUTE_PATHS.FORGOT_PASSWORD);
    }
  }, [email, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const pastedOtp = text.replace(/\D/g, '').slice(0, 6).split('');
        const newOtp = [...otp];
        pastedOtp.forEach((digit, i) => {
          if (i < 6) newOtp[i] = digit;
        });
        setOtp(newOtp);
        setError('');
        // Focus last filled input or last input
        const lastIndex = Math.min(pastedOtp.length, 5);
        inputRefs.current[lastIndex]?.focus();
      });
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedOtp = pastedData.replace(/\D/g, '').slice(0, 6).split('');
    
    const newOtp = [...otp];
    pastedOtp.forEach((digit, i) => {
      if (i < 6) newOtp[i] = digit;
    });
    setOtp(newOtp);
    setError('');
    
    // Focus last filled input or last input
    const lastIndex = Math.min(pastedOtp.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleResend = async () => {
    setCanResend(false);
    setTimeLeft(120);
    setOtp(new Array(6).fill(''));
    setError('');
    
    try {
      await sendOtp(email);
      // Optionally show success feedback
      console.log('OTP resent successfully');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to resend OTP. Please try again.';
      setError(message);
      setCanResend(true); // Allow retry if failed
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join('');
    
    // Validation
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    if (!email) {
      setError('Email not found. Please go back and try again.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { successCode } = await verifyOtp(email, otpValue);

      // Store successCode in session storage as backup
      sessionStorage.setItem('reset_successCode', successCode);

      // Navigate to new password page with successCode and email
      navigate(ROUTE_PATHS.NEW_PASSWORD, {
        state: { 
          successCode: successCode,
          email: email 
        },
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Invalid OTP. Please try again.';
      setError(message);
      setOtp(new Array(6).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OtpVerificationContainer>
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
      
      <OtpVerificationCard
        data-cursor-block
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>🔐 InternRoutineTracker</Logo>
        <Title>Verify OTP</Title>
        <Subtitle>
          We've sent a 6-digit verification code to your email/phone. Please enter it below.
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          <OtpInputContainer>
            {otp.map((digit, index) => (
              <OtpInput
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="number"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isSubmitting}
                autoFocus={index === 0}
              />
            ))}
          </OtpInputContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <VerifyButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </VerifyButton>
        </Form>

        <ResendSection>
          <ResendText>
            {canResend ? (
              "Didn't receive the code?"
            ) : (
              <>
                Resend code in <Timer>{formatTime(timeLeft)}</Timer>
              </>
            )}
          </ResendText>
          {canResend && (
            <ResendButton onClick={handleResend}>
              Resend OTP
            </ResendButton>
          )}
        </ResendSection>

        <BackLink href="/forgot-password">← Change Email/Phone</BackLink>
      </OtpVerificationCard>
    </OtpVerificationContainer>
  );
};

export default OtpVerificationPage;

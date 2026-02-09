import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ROUTE_PATHS from '../routes/RoutePaths';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import {
  LoginContainer,
  LoginCard,
  Logo,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  ForgotRow,
  ForgotLink,
  SignUpText,
  SignUpLink,
  TopRightAction,
  // CardWrapper
} from '../pages.styles/LoginPage.styles';

import { LoaderOverlay } from '../components/common/LoaderOverlay'; // CHANGED
import { NotebookLoader } from '../components/common'; // CHANGED

//state type definition
type LoginState = {
  email: string;
  password: string;
  formErrors: { email?: string; password?: string };
  isSubmitting: boolean;
};

//action type definitions
type LoginActions = 
| { type: 'SET_EMAIL'; payload: string }
| { type: 'SET_PASSWORD'; payload: string }
| { type: 'SET_FORM_ERRORS'; payload: { email?: string; password?: string } }
| { type: 'SET_IS_SUBMITTING'; payload: boolean };

//Initial State for the form 
const initialState: LoginState = {
  email: '',
  password: '',
  formErrors: {} as { email?: string; password?: string },
  isSubmitting: false,
};
//Reducer function implementation
const reducer = (state : LoginState, action: LoginActions) =>{
  switch(action.type){
    case 'SET_EMAIL':
      return {...state, email: action.payload };
    case 'SET_PASSWORD':
      return {...state, password: action.payload };
    case 'SET_FORM_ERRORS':
      return {...state, formErrors: action.payload };
    case 'SET_IS_SUBMITTING':
      return {...state, isSubmitting: action.payload };
    default:
      return state;
  }
};

const LoginPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, formErrors, isSubmitting } = state;

  const { login, error, clearError , isLoading } = useAuth();
  const navigate = useNavigate();

  //validate the form inputs
  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // setFormErrors(errors);
    dispatch({ type: 'SET_FORM_ERRORS', payload: errors });

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (validateForm()) {
      // setIsSubmitting(true);
      dispatch({ type: 'SET_IS_SUBMITTING', payload: true });
      try {
        await login({ email, password });
        navigate('/dashboard');
      } catch (err) {
        // Error is handled by the auth context
        console.error('Login failed:', err);
      } finally {
        // setIsSubmitting(false);
        dispatch({ type: 'SET_IS_SUBMITTING', payload: false });
      }
    }
  };

  return (
    <LoginContainer>
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
        {isLoading && (
          <LoaderOverlay>
            <NotebookLoader message="Please wait" subtext="Signing you in" />
          </LoaderOverlay>
        )}

      <LoginCard
        data-cursor-block
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>InternRoutineTracker</Logo>
        <Title>Sign in to your account</Title>
        
        {error && (
          <Alert
            variant="error"
            message={error}
            onClose={() => clearError()}
            showIcon={true}
          />
        )}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
              placeholder="you@example.com"
            />
            {formErrors.email && <ErrorMessage>{formErrors.email}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              // onChange={(e) => setPassword(e.target.value)}
              onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
              placeholder="••••••••"
            />
            {formErrors.password && <ErrorMessage>{formErrors.password}</ErrorMessage>}
          </FormGroup>

          <ForgotRow>
            <ForgotLink to="/forgot-password">Forgot password?</ForgotLink>
          </ForgotRow>
          
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </SubmitButton>
        </Form>
        
        <SignUpText>
          Don't have an account?
          <SignUpLink to="/register">Sign up</SignUpLink>
        </SignUpText>

      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;

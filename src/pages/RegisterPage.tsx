import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  RegisterContainer,
  RegisterCard,
  HeaderSection,
  Logo,
  Title,
  Subtitle,
  Form,
  FormRow,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  AlertBox,
  SubmitButton,
  SignInText,
  SignInLink,
} from '../pages.styles/RegisterPage.styles';
import ROUTE_PATHS from '../routes/RoutePaths';
import Button from '../components/common/Button';
import { TopRightAction } from '../pages.styles/RegisterPage.styles';

//states to manage the form
type RegisterState = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  formErrors: { username?: string; email?: string; password?: string; confirmPassword?: string };
  isSubmitting: boolean;
};

//action types for the reducer function
type RegisterActions = 
| { type: 'SET_USERNAME'; payload: string }
| { type: 'SET_EMAIL'; payload: string }
| { type: 'SET_PASSWORD'; payload: string }
| { type: 'SET_CONFIRM_PASSWORD'; payload: string }
| { type: 'SET_FORM_ERRORS'; payload: { username?: string; email?: string; password?: string; confirmPassword?: string } }
| { type: 'SET_IS_SUBMITTING'; payload: boolean };

//initial state for the form
const initialState : RegisterState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  formErrors: {} as { username?: string; email?: string; password?: string; confirmPassword?: string },
  isSubmitting: false,
};

//Reducer function implementation
const reducer = (state : RegisterState, actions: RegisterActions) =>{
  switch(actions.type){
    case 'SET_USERNAME':
      return {...state, username: actions.payload };
    case 'SET_EMAIL':
      return {...state, email: actions.payload };
    case 'SET_PASSWORD':
      return {...state, password: actions.payload };
    case 'SET_CONFIRM_PASSWORD':
      return {...state, confirmPassword: actions.payload };
    case 'SET_FORM_ERRORS':
      return {...state, formErrors: actions.payload };
    case 'SET_IS_SUBMITTING':
      return {...state, isSubmitting: actions.payload };
    default:
      return state;
  }
}

const RegisterPage: React.FC = () => {
  
  //useReducer implementation
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, email, password, confirmPassword } = state;
  const { formErrors, isSubmitting } = state;

  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!username) {
      errors.username = 'Username is required';
    } else if (username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
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
    
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
        await register({ username, email, password, confirmPassword });
        // navigate('/dashboard');
        navigate(ROUTE_PATHS.DASHBOARD, { replace: true });
      } catch (err:unknown) {
        // Error is handled by the auth context
        console.log(err);
      } finally {
        // setIsSubmitting(false);
        dispatch({ type: 'SET_IS_SUBMITTING', payload: false });
      }
    }
  };

  return (
    <RegisterContainer>
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
      <RegisterCard
        data-cursor-block
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeaderSection>
          <Logo>InternRoutineTracker</Logo>
          <Title>Create your account</Title>
          <Subtitle>Track your internship activities efficiently</Subtitle>
        </HeaderSection>
        
        {error && (
          <AlertBox
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </AlertBox>
        )}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              // onChange={(e) => setUsername(e.target.value)}
              onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })}
              placeholder="Enter your username"
            />
            {formErrors.username && <ErrorMessage>{formErrors.username}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
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
          
          <FormRow>
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
            
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                onChange={(e) => dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: e.target.value })}
                placeholder="••••••••"
              />
              {formErrors.confirmPassword && <ErrorMessage>{formErrors.confirmPassword}</ErrorMessage>}
            </FormGroup>
          </FormRow>
          
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </SubmitButton>
        </Form>
        
        <SignInText>
          Already have an account?
          <SignInLink to="/login">Sign in</SignInLink>
        </SignInText>

      </RegisterCard>
    </RegisterContainer>
  );
};

export default RegisterPage;

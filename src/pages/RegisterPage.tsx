import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import Button from '../components/common/Button';
import ROUTE_PATHS from '../routes/RoutePaths';
import {
  LoginContainer,
  LoginCard,
  TopRightAction,
} from '../pages.styles/LoginPage.styles';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

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
      <LoginCard
        data-cursor-block
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <RegisterForm />
      </LoginCard>
    </LoginContainer>
  );
};

export default RegisterPage;

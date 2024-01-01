import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LoginForm from "../components/login/LoginForm";
import SignupForm from "../components/login/SignupForm.js";
import ForgotPasswordForm from "../components/login/ForgotPasswordForm";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  padding-top: 6.375rem;
  flex-grow: 1;

  @media (min-width: 1024px) {
    padding-top: 8.875rem;
  }
`;

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        {!showForgotPassword ? (
          showLogin ? (
            <LoginForm
              setShowLogin={setShowLogin}
              showLogin={showLogin}
              showForgotPassword={showForgotPassword}
              setShowForgotPassword={setShowForgotPassword}
            />
          ) : (
            <SignupForm setShowLogin={setShowLogin} showLogin={showLogin} />
          )
        ) : (
          <ForgotPasswordForm setShowForgotPassword={setShowForgotPassword} />
        )}
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default LoginPage;

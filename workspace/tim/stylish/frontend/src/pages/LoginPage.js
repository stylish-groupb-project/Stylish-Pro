import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LoginForm from "../components/login/LoginForm";
import SignupForm from "../components/login/SignupForm.js";
import styled from 'styled-components';

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
    return (
        <PageContainer>
            <Header />
            <ContentContainer>
                {showLogin ? (
                    <LoginForm setShowLogin={setShowLogin} showLogin={showLogin} />
                ) : (
                    <SignupForm setShowLogin={setShowLogin} showLogin={showLogin} />
                )}
            </ContentContainer>
            <Footer />
        </PageContainer>
    );
};

export default LoginPage;

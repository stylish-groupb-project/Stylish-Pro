import { useLocation } from 'react-router-dom';
import Header from "../components/layout/Header.js";
import Footer from "../components/layout/Footer.js";
import ResetPasswordForm from "../components/resetPassword/ResetPasswordForm.js";
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

const ResetPasswordPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <ResetPasswordForm resetToken={token} />
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default ResetPasswordPage;

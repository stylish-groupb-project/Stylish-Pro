import styled from 'styled-components';
// import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import formatDate from "../hooks/formateDate";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  padding-top: 6.375rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
`;

const Text = styled.p`
  margin-bottom: 1rem; 
  font-size: 1.25rem;=
`;

const HomePageLink = styled.a`
  background-color: black;
  color: white;
  padding: 0.625rem 3rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
`;

const ThankyouPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const time = searchParams.get("time");
  console.log(time);
  const formattedDate = formatDate(time);

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <Text>交易已完成</Text>
        <Text>訂單編號: {orderId}</Text>
        <Text>交易時間: {time}</Text>
        <HomePageLink href="/">回到首頁</HomePageLink>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default ThankyouPage;

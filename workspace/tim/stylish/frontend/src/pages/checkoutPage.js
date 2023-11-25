import styled from 'styled-components';
import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CheckoutItems from "../components/checkout/CheckoutProduct";
import OrderForm from "../components/checkout/OrderForm";

const MainContent = styled.div`
  padding-top: 6.375rem;
  margin: auto;
  margin-top: 1.25rem; /* mt-5 */
  margin-bottom: 1.75rem; /* mb-7 */
  margin-left: 1.5rem; /* mx-6 */
  margin-right: 1.5rem;
  @media (min-width: 1024px) {
    padding-top: 8.875rem; /* 大屏幕上邊距 */
    max-width: 1160px;
    margin-top: 50px;
    margin-bottom: 148px;
  }
`;

const CheckoutPage = () => {
  const [cartUpdate, setCartUpdate] = useState(false);

  return (
    <div>
      <Header />
      <MainContent>
        <CheckoutItems setCartUpdate={setCartUpdate} />
        <OrderForm cartUpdate={cartUpdate} setCartUpdate={setCartUpdate} />
      </MainContent>
      <Footer />
    </div>
  );
};

export default CheckoutPage;

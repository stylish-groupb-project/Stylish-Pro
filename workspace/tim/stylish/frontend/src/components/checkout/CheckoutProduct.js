import styled from 'styled-components';
import { useState, useEffect, useContext } from "react";
import CartItem from "./CartItem";
import { CartCountContext } from "../../contexts/CartCountManager";

const CartHeader = styled.div`
  display: flex;
  margin-bottom: 1rem;

  @media (max-width: 1280px) {
    margin-bottom: 0;
  }
`;

const CartTitle = styled.span`
    font-family: sans-serif;
    font-weight: bold;
    font-size: 1rem;
    color: #3F3A3A;
    width: 46%;

    @media (max-width: 1280px){
        padding-left: 1rem;
        width: 100%;
    }
  
`;

const CartInfo = styled.div`
  display: none;
  min-width: 32.5rem;

  
  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-around;
    width: 30%;
    align-items: center;
  }
`;

const CartItemContainer = styled.div`
  border: 1px solid #979797;
  padding-top: 2.5rem;
  padding-bottom: 0.625rem; /* pb-[10px] */
  padding-left: 1.875rem;
  padding-right: 1.875rem;

  @media (max-width: 1280px){
    border: none;
    padding-top: 0;
    padding-left: 1rem;
    padding-right: 1rem;
  }

`;

const OrderWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const CheckoutItems = ({ setCartUpdate }) => {
  const [cartData, setCartData] = useState([]);
  const { count } = useContext(CartCountContext);

  useEffect(() => {
    const handleStorageChange = () => {
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartData(cartItems);
    };
    handleStorageChange();
  }, [count]);
//   console.log(cartData[0]);
  const cartItems = cartData.map((cartItem) => (
    <CartItem
      key={cartItem.id + cartItem.color + cartItem.size}
      cartItem={cartItem}
      setCartUpdate={setCartUpdate}
    />
  ));

  return (
    <OrderWindow>
      <CartHeader>
        <CartTitle>購物車</CartTitle>
        <CartInfo>
          <span>數量</span>
          <span>單價</span>
          <span>小計</span>
        </CartInfo>
      </CartHeader>
      <CartItemContainer>
        {cartData.length > 0 ? cartItems : <p>目前沒有任何商品</p>}
      </CartItemContainer>
    </OrderWindow>
  );
};

export default CheckoutItems;

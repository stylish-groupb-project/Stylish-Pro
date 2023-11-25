import styled from 'styled-components';
import { useContext } from "react";
import CartIcon from "../../assets/images/cart.png";
import HoveredCartIcon from "../../assets/images/cart-hover.png";
import MobileCartIcon from "../../assets/images/cart-mobile.png";
import { CartCountContext } from "../../contexts/CartCountManager";
import './hover.css';

const CartContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CartImage = styled.img`
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const HoveredCartImage = styled(CartImage)`
    position: absolute;
    transition: transform 0.3s;
    top: 0;
    left: 0;
    display: none;

  ${CartContainer}:hover & {
    display: block;
  }
`;

const MobileCartImage = styled.img`
  display: block;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const CartCount = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  font-size: 0.75rem;
  color: white;
  border-radius: 50%;
  background-color: brown;
`;

const Cart = () => {
    const { count } = useContext(CartCountContext);

    return (
        <CartContainer>
            <CartImage src={CartIcon} alt="cart" />
            {/* <div className='cart-container'>
                <img className="cart" alt="Cart" src={CartIcong} />
                <img className="cart-hover" alt="Cart" src={cartHoverImg} />
            </div> */}
            <HoveredCartImage src={HoveredCartIcon} alt="cart-hover" />
            <MobileCartImage src={MobileCartIcon} alt="cart" />
            <CartCount data-testid="cart-count">
                {count}
            </CartCount>
        </CartContainer>
    );
};

export default Cart;

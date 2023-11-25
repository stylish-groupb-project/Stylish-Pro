import styled from 'styled-components';
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { CartCountContext } from "../../contexts/CartCountManager";
import CartRemove from "../../assets/images/cart-remove.png";
import CartRemoveHovered from "../../assets/images/cart-remove-hover.png";
import '../layout/hover.css';
const CartItemContainer = styled.div`
  border-top: 1px solid #3F3A3A;
  margin-top: 1.25rem;

  @media (min-width: 1024px) {
    margin-bottom: 1.2rem;
    border-top: none;
  }
`;

const ItemDisplay = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.25rem;
  @media (min-width: 1024px) {
    margin-top: 0;
  }
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
`;

const ProductInfo = styled.div`
  margin-left: 1rem;
  min-width: 370px;
`;

const ProductDetails = styled.p`
  font-family: sans-serif;
  font-size: 1rem;
  line-height: 1.25rem;
  margin-bottom: 1.125rem;
`;

const QuantitySelect = styled.select`
  width: 5rem;
  padding: 0 0.25rem;
  border: 1px solid;
  border-radius: 0.7rem;
  background-color: #F3F3F3;
  outline: none;
  height: 2.2rem;
`;

const PriceDisplay = styled.p`
  /* 根據需要添加樣式 */
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: none;
  
  @media (min-width: 1024px) {
    position: relative;

  }
`;
const CartItemImage = styled.img`
  max-width: 114px;
  aspect-ratio: 3 / 3.5;
  height: auto;
`;
const ItemDetailBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 50%;
    align-items: center;


`

const CartItem = ({ cartItem, setCartUpdate }) => {
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const { decrementCartCount } = useContext(CartCountContext);

    const options = [...Array(cartItem.stock).keys()].map((value) => (
        <option key={value + 1} value={value + 1}>
            {value + 1}
        </option>
    ));

    const QuantityChangeHandler = (e) => {
        setQuantity(Number(e.target.value));
        const cartItemsData = JSON.parse(localStorage.getItem("cart") || "[]");
        const itemIndex = cartItemsData.findIndex(
            (item) =>
                item.id === cartItem.id && item.colorCode === cartItem.colorCode && item.size === cartItem.size,
        );
        if (itemIndex !== -1) {
            cartItemsData[itemIndex].quantity = Number(e.target.value);
            localStorage.setItem("cart", JSON.stringify(cartItemsData));
            setCartUpdate(true);
        }

    };

    const deleteProductHandler = () => {
        Swal.fire({
            title: "確定要移除商品",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "確定刪除",
            cancelButtonText: "取消",
        }).then((result) => {
            if (result.isConfirmed) {
                const cartItemsData = JSON.parse(localStorage.getItem("cart") || "[]");
                const itemIndex = cartItemsData.findIndex(
                    (item) =>
                        item.id === cartItem.id && item.colorCode === cartItem.colorCode && item.size === cartItem.size,
                );
                if (itemIndex !== -1) {
                    cartItemsData.splice(itemIndex, 1);
                    localStorage.setItem("cart", JSON.stringify(cartItemsData));
                    decrementCartCount();
                }
                Swal.fire({
                    title: "Deleted!",
                    text: "商品已移除",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                });
            }
        });
    };

    return (
        <CartItemContainer>
            <ItemDisplay>
                <ImageContainer>
                    <CartItemImage src={cartItem.image} alt={cartItem.name} />
                </ImageContainer>
                <ProductInfo>
                    <ProductDetails>{cartItem.name}</ProductDetails>
                    <ProductDetails>{cartItem.id}</ProductDetails>
                    <ProductDetails>顏色 | {cartItem.color}</ProductDetails>
                    <ProductDetails>尺寸 | {cartItem.size}</ProductDetails>
                </ProductInfo>
                <ItemDetailBlock>
                    <QuantitySelect value={quantity} onChange={QuantityChangeHandler}>
                        {options}
                    </QuantitySelect>
                    <PriceDisplay>TWD.{cartItem.price}</PriceDisplay>
                    <PriceDisplay>TWD.{cartItem.price * quantity}</PriceDisplay>
                </ItemDetailBlock>
                <div className='remove-img-container'>
                    <RemoveButton onClick={deleteProductHandler}>
                        <img src={CartRemove} className='remove-img' alt="Remove" />
                        <img src={CartRemoveHovered} className='remove-img-hover' alt="Remove Hovered" />
                    </RemoveButton>
                </div>

            </ItemDisplay>
        </CartItemContainer>
    );
};

export default CartItem;

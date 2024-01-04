import React from "react";
import { useNavigate } from "react-router-dom";

import {
  ColorBlock,
  ColorContainer,
} from "../../styled-components/ProductColor";
import "./productCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      className="product-card"
      onClick={handleClick}
      data-testid="product-card"
    >
      <div className="product-card">
        <img src={product.main_image} alt={product.title} />
        <ColorContainer>
          {product.colors.map((color, index) => (
            <ColorBlock key={index} colorCode={color.code} />
          ))}
        </ColorContainer>
        <div className="product-info">
          <div className="product-title">{product.title}</div>
          <div className="product-price">TWD.{product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

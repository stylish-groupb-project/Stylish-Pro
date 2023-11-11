import React from "react";
import { ColorBlock, ColorContainer } from "../styled-components/ProductColor";
import './productCard.css'
const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.imgUrl} alt={product.title} />
            <ColorContainer>
                {product.colors.map((color) => (
                    <ColorBlock key={color.id} colorCode={color.color_code} />
                ))}
            </ColorContainer>
            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">TWD.{product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
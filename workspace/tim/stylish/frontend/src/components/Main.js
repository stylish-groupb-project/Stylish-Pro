import React from "react";
import "./main.css";
import Slider from "./Slider";
import ProductCard from "./ProductCard";
const Main = () => {
    const imgArray = [
        {
            id: 1,
            imgUrl: "./img/slideImg1.png"
        },
        {
            id: 2,
            imgUrl: "./img/slideImg2.png"
        },
        {
            id: 3,
            imgUrl: "./img/slideImg3.png"
        },
        {
            id: 4,
            imgUrl: "./img/slideImg4.png"
        },
        {
            id: 5,
            imgUrl: "./img/slideImg5.png"
        }
    ];
    const products = [
        {
            id: 1,
            title: "test",
            price: 10,
            imgUrl: "./img/dress.png"
        },
        {
            id: 2,
            title: "test",
            price: 10,
            imgUrl: "./img/dress.png"
        },
        {
            id: 3,
            title: "test",
            price: 10,
            imgUrl: "./img/dress.png"
        },
        {
            id: 4,
            title: "test",
            price: 10,
            imgUrl: "./img/dress.png"
        },
        {
            id: 5,
            title: "test",
            price: 10,
            imgUrl: "./img/dress.png"
        },
        {
            id: 6,
            title: "test",
            price: 10,
            imgUrl: "./img/dress.png"
        }
    ]
    return (
        <div className="main">
            <Slider slides={imgArray}></Slider>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
};
export default Main;
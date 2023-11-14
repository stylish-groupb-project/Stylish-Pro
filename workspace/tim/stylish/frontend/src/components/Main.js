import React from "react";
import "./main.css";
import Slider from "./Slider";
import ProductCard from "./ProductCard";
import { useQuery } from 'react-query';
const Main = () => {
    const todoKeys = {
        filter: ['products'],
        all: ()=>[...todoKeys.filter,'all'],
        men: ()=>[...todoKeys.filter,'men'],
        women: ()=>[...todoKeys.filter,'women'],
        accessories: ()=>[...todoKeys.filter,'accessories']
    };
    const getAllProdcutData = async () => {
        const response = await fetch('https://13.55.47.107/api/1.0/products/all');
        if (!response.ok) {
            throw new Error('getProduct api response was not ok');
        }
        return response.json();
    };
    const { data: products, isLoading, error } = useQuery(todoKeys.all(), getAllProdcutData);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred: {error.message}</div>;
    // console.log(products)
    // console.log(products.data[0].colors[0].code)
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
    
    
    return (
        <div className="main">
            <Slider slides={imgArray}></Slider>
            <div className="product-grid">
                {products.data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
};
export default Main;
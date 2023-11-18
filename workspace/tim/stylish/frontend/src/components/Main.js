import React, { useState } from 'react';
import "./main.css";
import Slider from "./slider/Slider";
import ProductCard from "./productCard/ProductCard";
import axios from 'axios';
import { useQuery } from "react-query";
const Main = () => {
    // console.log(products);
    const [productList, setProductList] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`https://13.55.47.107/api/1.0/products/all`);
            setProductList(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const { data: products, isLoading, error } = useQuery("test", fetchProducts);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    console.log(products.data);
    // console.log(productList)
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
                {/* {products.data.map((product) => ( */}
                {products.data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
};
export default Main;
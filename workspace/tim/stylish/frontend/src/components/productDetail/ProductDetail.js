import { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
//TODO
import {GetProductDetail} from "../../hooks/api";
import { CartCountContext } from "../../contexts/CartCountManager";
import styled from 'styled-components';
import "./productDetail.css";
const ColorBtn = styled.button`
    background: #${(props) => props.colorCode};
    width: 1.2rem;
    height: 1.2rem;
    border: 1px solid #D3D3D3;
    margin-left: 1rem;
    cursor: pointer;
   
    ${(props) =>
        props.isSelected && `
        outline: 1px solid black;
        outline-offset: 3px;
    `}
`;
const VariantBtn = styled.button`
    width: 1.5rem;
    height: 1.5rem;
    background: ${(props) => (props.isSelected ? 'black' : '#ECECEC')};
    border-radius: 50%;
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${(props) => (props.isSelected ? 'white' : 'black')};
    opacity: ${(props) => (props.disabled ? '0.25' : '1')};

    &:disabled {
        cursor: not-allowed;
    }
`;
const AmountBlock = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 6px 15px;
    border: 1px solid;
    width: ${(props) => (props.isLarge ? '10rem' : '100%')};
`;
const AmountBtn = styled.button`
    opacity: ${(props) => (props.disabled ? '0.25' : '1')};
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;

    &:disabled {
        cursor: not-allowed;
    }
`;
//may change font size
const AmountText = styled.span`
    color: ${(props) => props.theme.textBrown};
`;
const SubImg = styled.img`
    margin-bottom: 1.25rem;
    max-width: 430px;
    min-width: 312px;
    @media (min-width: 1280px) {
        margin-bottom: 30px;
    }
`;



const ProductDetail = () => {
    const { id } = useParams();
    console.log("testId:"+id);
    const { data, isLoading, isError,error,isSuccess } = useQuery({
        queryKey: ["productDetails", id],
        queryFn: () => GetProductDetail(id)
    });
//     const { data, isLoading, isError, error } = useQuery(["productDetails", 110], () =>
//   GetProductDetail(110)
// );
    
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedColorName, setSelectedColorName] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [count, setCount] = useState(1);
    const { incrementCartCount } = useContext(CartCountContext);
    useEffect(() => {
        if (data) {
            console.log(data);
            setSelectedColor(data.colors[0]?.code);
            setSelectedColorName(data.colors[0]?.name);
        }
    }, [data]);
    // if(isLoading){
    //     return (
    //         <div>
    //             isLonding
    //         </div>
    //     )
    // }
    // console.log(isLoading);
    if(isSuccess){
        // console.log(data.data);
        const colorItems = data.colors.map((color) => (
            // <div key={color.code} className="colorContainer">
            <ColorBtn
                type="button"
                key={color.code}
                colorCode={color.code}
                onClick={() => {
                    setSelectedColor(color.code);
                    setSelectedColorName(color.name);
                }}
                isSelected={color.code === selectedColor}
            />
            // </div>
        ));
        const variants = data.variants.filter((variant) => variant.color_code === selectedColor);
    
        const sortedVariants = variants.sort((a, b) => {
            const customSizeOrder = ["S", "M", "L"];
            const indexOfA = customSizeOrder.indexOf(a.size);
            const indexOfB = customSizeOrder.indexOf(b.size);
            return indexOfA - indexOfB;
        });
        
        const sizeItems = sortedVariants.map((variant) => (
            <VariantBtn
                type="button"
                key={variant.size}
                onClick={() => {
                    setSelectedSize(variant.size);
                }}
                isSelected={variant.size === selectedSize}
                disabled={variant.stock === 0}
                data-testid="product-size-button"
            >
                {variant.size}
                {/* <p className="sizeText">{variant.size}</p> */}
            </VariantBtn>
    
        ));
        const selectedVariant = sortedVariants.find((variant) => variant.size === selectedSize);
    
        const limitAmountReached = selectedVariant && count >= selectedVariant.stock;
        const amountButton = (
            <AmountBlock isLarge={window.innerWidth >= 1280}>
                <AmountBtn
                    type="button"
                    onClick={() => {
                        setCount((prev) => Math.max(prev - 1, 1));
                    }}
                    disabled={count === 1}
                >
                    -
                </AmountBtn>
                <AmountText>{count}</AmountText>
                <AmountBtn
                    type="button"
                    onClick={() => {
                        setCount((prev) => (limitAmountReached ? prev : prev + 1));
                    }}
                    disabled={limitAmountReached}
                >
                    +
                </AmountBtn>
            </AmountBlock>
        );
        const imagesItems = data.images?.map((image) => (
            <SubImg key={image} src={image} alt="相關商品圖片" />
        ));

        const addToCartHandler = () => {
            if (data && selectedVariant && count > 0) {
                const productCartData = {
                    id: data.id,
                    name: data.title,
                    image: data.main_image,
                    color: {
                        colorName: selectedColorName,
                        colorCode: selectedColor
                    },
                    size: selectedSize,
                    quantity: count,
                    stock: selectedVariant.stock,
                    price: data.price,
                };
                console.log("localStorage :",productCartData)
                const currentCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    
                const checkCurrentItem = currentCartItems.findIndex(
                    (item) =>
                        item.id === productCartData.id && item.color.colorName === productCartData.color.colorName && item.color.colorCode === productCartData.color.colorCode && item.size === productCartData.size,
                );
                if (checkCurrentItem !== -1) {
                    currentCartItems[checkCurrentItem].quantity += productCartData.quantity;
                    localStorage.setItem("cart", JSON.stringify(currentCartItems));
                    alert("已增加商品數量");
                } else {
                    currentCartItems.push(productCartData);
                    localStorage.setItem("cart", JSON.stringify(currentCartItems));
                    alert("已加入購物車");
                    incrementCartCount();
                }
            } else {
                alert("請選擇商品尺寸");
            }
        }
        return (
            <div className="product-detail-window">
                {/* <div className="product-detail-container"> */}
                    <div className="product-detail">
                        <img src={data.main_image} alt={data.title} class="main-image" />
                        <div className="product-data-container">
                            <div className="data-head">
                                <span className="title">{data.title}</span>
                                <span className="product-id">{data.id}</span>
                                <p className="product-price">TWD.{data.price}</p>
                            </div>
                            <div className="data-main">
                                <div className="color-block">
                                    <span className="color-label">顏色 | </span>
                                    {colorItems}
                                </div>
                                <div className="size-block">
                                    <span className="size-label">尺寸 | </span>
                                    {sizeItems}
                                </div>
                                <div className="amount-block">
                                    <span className="amount-label">數量 | </span>
                                    {amountButton}
                                </div>
                            </div>
                            <button
                                className="add-cart-btn"
                                type="button"
                                onClick={addToCartHandler}
                            >
                                {!selectedSize ? "請選擇尺寸" : "加入購物車"}
                            </button>
                            <div className="data-foot">
                                <span className="note">{data.note}</span>
                                <div className="texture-info">
                                    {/* <span>{data.texture}</span> */}
                                    <pre className="description">
                                        {`${data.texture}\n`}
                                        {data.description}
                                    </pre>
                                </div>
                                <span>清洗 : {data.wash}</span>
                                <span>產地 : {data.place}</span>
                            </div>
                        </div>
                    </div>
                    <div className="others-info-container">
                        <div className="others-title">
                            <span className="more-info">更多商品資訊</span>
                            <span className="split-line"></span>
                            {/* <div className="split-line"/> */}
                        </div>
                        <p className="story">{data.story}</p>
                        <div className="sub-images"> {imagesItems}</div>
                    </div>
                {/* </div> */}
    
            </div>
    
    
        );
    
    }
    
    

}

export default ProductDetail;
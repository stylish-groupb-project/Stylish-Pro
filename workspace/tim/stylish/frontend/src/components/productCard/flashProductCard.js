import React from "react";
import { useNavigate } from "react-router-dom";

import {
  ColorBlock,
  ColorContainer,
} from "../../styled-components/ProductColor";
// import { format } from "date-fns";
import Countdown from "react-countdown";
import "./productCard.css";

const FlashProductCard = ({ product, secKillInfo }) => {
  const navigate = useNavigate();

  // const formattedTime = secKillInfo
  //   ? formatDateTime(secKillInfo.start_time)
  //   : "";

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      className="product-card"
      onClick={handleClick}
      data-testid="product-card"
    >
      <div className="countdown-triangle bottom-right">
        限量 {secKillInfo?.amount}
      </div>
      <div className="product-image-container">
        <img src={product.main_image} alt={product.title} />
        <ColorContainer>
          {product.colors.map((color, index) => (
            <ColorBlock key={index} colorCode={color.code} />
          ))}
        </ColorContainer>
        {secKillInfo && (
          <div className="seckill-info">
            <Countdown
              date={
                Date.now() +
                (secKillInfo.start_time
                  ? new Date(secKillInfo.start_time).getTime() - Date.now()
                  : 0)
              }
              renderer={renderer}
            />
          </div>
        )}
      </div>
      <div className="product-info">
        <div className="product-title">{product.title}</div>
        <div className="product-price">TWD.{product.price}</div>
      </div>
    </div>
  );
};

// const formatDateTime = (dateTimeString) => {
//   const dateTime = new Date(dateTimeString);
//   const formattedDate = format(dateTime, "yyyy-MM-dd HH:mm:ss a");
//   return formattedDate;
// };

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span>Seckill Ended</span>;
  } else {
    // Render a countdown
    return (
      <span>
        {`${days} 天 `}
        {hours < 10 ? `0${hours}` : hours} 時{" "}
        {minutes < 10 ? `0${minutes}` : minutes} 分{" "}
        {seconds < 10 ? `0${seconds}` : seconds} 秒
      </span>
    );
  }
};

export default FlashProductCard;

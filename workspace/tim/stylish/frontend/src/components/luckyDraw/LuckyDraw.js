import styled from "styled-components";
import React, { useState } from "react";
import LotteryIcon from "../../assets/images/lottery.png";
import LotteryModal from "./LotteryModal";

const LotteryBtn = styled.img`
  width: 60px;
  position: fixed;
  bottom: 150px;
  right: 10px;
  cursor: pointer;
  transform: ${(props) => props.transform};
  transition: transform 200ms cubic-bezier(0.5, 0, 0.5, 1);

  @media screen and (max-width: 1279px) {
    width: 80px;
    position: fixed;
    bottom: 60px;
    right: 0px;
    cursor: pointer;
    background-color: #fafafa;
    border-radius: 9999px;
    box-shadow: -9px 10px 30px rgba(112, 112, 112, 0.35);
  }
  &:hover {
    transform: scale(1.2);
    // Add any other styles you want to apply on hover
  }
`;

const LuckyDraw = () => {
  const [showLottery, setShowLottery] = useState(false);

  const handleOpenLottery = () => {
    setShowLottery(true);
  };

  const handleCloseLottery = () => {
    setShowLottery(false);
  };

  return (
    <div>
      <LotteryBtn src={LotteryIcon} onClick={handleOpenLottery} />
      {showLottery && <LotteryModal onClose={handleCloseLottery} />}
    </div>
  );
};

export default LuckyDraw;

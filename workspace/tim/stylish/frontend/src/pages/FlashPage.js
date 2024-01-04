import React, { useState, useEffect } from "react";
import Slider from "../components/slider/Slider";
import styled from "styled-components";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FlashProducts from "../components/product/FlashProducts";
import Chatbot from "../components/chatBot/ChatBot";
import Flash from "../components/flash/Flash";
import LuckyDraw from "../components/luckyDraw/LuckyDraw";
import CountdownTitle from "../components/timer/CountdownTitle";
import axios from "axios";
const elasticIp = process.env.REACT_APP_ELASTIC_IP || "localhost";

const MainContent = styled.div`
  padding-top: 6.375rem;

  @media (min-width: 1024px) {
    padding-top: 8.875rem;
  }
`;

const FlashPage = ({ endpoint }) => {
  const [secKillData, setSecKillData] = useState([]);
  const [targetTime, setTargetTime] = useState(null);

  useEffect(() => {
    const fetchSecKillData = async () => {
      try {
        const response = await axios.get(
          `https://${elasticIp}/api/1.0/products/secKill`
        );
        setSecKillData(response.data);

        const closestStartTime = findClosestStartTime(response.data);
        setTargetTime(closestStartTime);
      } catch (error) {
        console.error("Error fetching secKill data:", error);
      }
    };

    fetchSecKillData();
  }, []);

  const findClosestStartTime = (data) => {
    const now = Date.now();

    // Filter out flash sales that have already ended
    const upcomingFlashSales = data.filter((item) => {
      const startTime = new Date(item.start_time).getTime();
      return startTime > now;
    });

    if (upcomingFlashSales.length === 0) {
      return null; // No upcoming flash sales found
    }

    // Find the closest upcoming start time
    const closestStartTime = upcomingFlashSales.reduce(
      (closest, item) => {
        const startTime = new Date(item.start_time).getTime();
        const timeDiff = Math.abs(startTime - now);
        if (timeDiff < closest.timeDiff) {
          return { startTime, timeDiff };
        }
        return closest;
      },
      { startTime: 0, timeDiff: Infinity }
    );

    return closestStartTime.startTime;
  };

  const bannerImages = secKillData
    .map((item, index) => ({
      id: index + 1,
      imgUrl: item.banner_image_url,
    }))
    .filter(Boolean);

  const limitedBannerImages = bannerImages.slice(0, 5);

  return (
    <>
      <Header />
      <MainContent>
        <Slider slides={limitedBannerImages} />
        <CountdownTitle targetTime={targetTime} /> {/* Use the new component */}
        <FlashProducts endpoint={endpoint} secKillData={secKillData} />
      </MainContent>
      <Chatbot />
      <Flash />
      <LuckyDraw />
      <Footer />
    </>
  );
};

export default FlashPage;

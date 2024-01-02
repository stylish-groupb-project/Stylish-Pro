import React, { useState, useRef } from "react";
import { LuckyWheel } from "@lucky-canvas/react";
import WheelBtn from "../../assets/images/wheel-button.png";
import Swal from "sweetalert2";
import axios from "axios";

const LotteryWheel = () => {
  const [blocks] = useState([{ padding: "10px", background: "#313538" }]);
  const [prizes] = useState([
    {
      background: "#FFFFFF",
      fonts: [
        {
          text: "免運卷",
          fontColor: "#313538",
          top: "30%",
          fontSize: "24px",
          fontWeight: 500,
        },
      ],
    },
    {
      background: "#8B572A",
      fonts: [
        {
          text: "10元",
          fontColor: "#FFFFFF",
          top: "20%",
          fontSize: "24px",
          fontWeight: 500,
        },
        {
          text: "折價卷",
          fontColor: "#FFFFFF",
          top: "50%",
          fontSize: "24px",
          fontWeight: 500,
        },
      ],
    },
    {
      background: "#FFFFFF",
      fonts: [
        {
          text: "20元",
          fontColor: "#8B572A",
          top: "20%",
          fontSize: "24px",
          fontWeight: 500,
        },
        {
          text: "折價卷",
          fontColor: "#8B572A",
          top: "50%",
          fontSize: "24px",
          fontWeight: 500,
        },
      ],
    },
    {
      background: "#8B572A",
      fonts: [
        {
          text: "免運卷",
          fontColor: "#FFFFFF",
          top: "30%",
          fontSize: "24px",
          fontWeight: 500,
        },
      ],
    },
    {
      background: "#FFFFFF",
      fonts: [
        {
          text: "30元",
          fontColor: "#8B572A",
          top: "20%",
          fontSize: "24px",
          fontWeight: 500,
        },
        {
          text: "折價卷",
          fontColor: "#8B572A",
          top: "50%",
          fontSize: "24px",
          fontWeight: 500,
        },
      ],
    },
    {
      background: "#8B572A",
      fonts: [
        {
          text: "明天",
          fontColor: "#FFFFFF",
          top: "20%",
          fontSize: "24px",
          fontWeight: 500,
        },
        {
          text: "再來",
          fontColor: "#FFFFFF",
          top: "50%",
          fontSize: "24px",
          fontWeight: 500,
        },
      ],
    },
  ]);
  // const [buttons] = useState([
  //   { radius: "40%", background: "#313538" },
  //   { radius: "35%", background: "#FFFFFF" },
  //   {
  //     radius: "30%",
  //     background: "#313538",
  //     pointer: true,
  //     fonts: [
  //       {
  //         text: "GO",
  //         top: "-10px",
  //         fontColor: "#FFFFFF",
  //         fontSize: "24px",
  //         fontWeight: 500,
  //       },
  //     ],
  //     imgs: [{ src: "../../assets/images/wheel-button.png" }],
  //   },
  // ]);

  const [buttons] = useState([
    {
      radius: "45%",
      imgs: [{ src: WheelBtn, width: "100%", top: "-130%" }],
    },
  ]);

  const myLucky = useRef();

  const handleStart = () => {
    myLucky.current.play();
    setTimeout(() => {
      const index = (Math.random() * 6) >> 0;
      myLucky.current.stop(index);
    }, 1000);
  };

  const handleEnd = (prize) => {
    const prizeText = prize.fonts.map((font) => font.text).join("");
    Swal.fire("恭喜你抽到 " + prizeText);
    // API call to save the prize to the database
    savePrizeToDB(prizeText);
  };

  const savePrizeToDB = async (prize) => {
    try {
      const response = await axios.post("YOUR_API_ENDPOINT", { prize });

      // Handle the response if needed
      if (response.status === 200) {
        console.log("Prize saved successfully:", response.data);
      } else {
        console.error("Failed to save prize to the database");
      }
    } catch (error) {
      console.error(error.message);
      // Handle the error
    }
  };

  return (
    <div>
      <LuckyWheel
        ref={myLucky}
        width="400px"
        height="400px"
        blocks={blocks}
        prizes={prizes}
        buttons={buttons}
        onStart={handleStart}
        onEnd={handleEnd}
        defaultConfig={{ gutter: "5px" }}
      />
    </div>
  );
};

export default LotteryWheel;

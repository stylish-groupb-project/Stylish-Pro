import React, { useState, useRef } from "react";
import { LuckyWheel } from "@lucky-canvas/react";
import WheelBtn from "../../assets/images/wheel-button.png";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const elasticIp = process.env.REACT_APP_ELASTIC_IP || "localhost";

const LotteryWheel = () => {
  const navigate = useNavigate();
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

  const [buttons] = useState([
    {
      radius: "45%",
      pointer: true,
      imgs: [{ src: WheelBtn, width: "100%", top: "-130%" }],
    },
  ]);

  const myLucky = useRef();

  const handleStart = async () => {
    try {
      const isLoggedIn = Cookies.get("token") !== undefined;

      if (!isLoggedIn) {
        Swal.fire({
          title: "請先登入",
          text: "只有登入會員才能參加抽獎，是否前往登入？",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "是的，前往登入",
          cancelButtonText: "取消",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
        return;
      }

      const response = await axios.get(
        `https://${elasticIp}/api/1.0/order/checkTodayPrize`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      console.log(response);
      const prizeData = response.data;
      console.log(prizeData);

      if (prizeData) {
        Swal.fire("今天已經抽過獎品了！");
      } else {
        myLucky.current.play();
        setTimeout(() => {
          const index = (Math.random() * 6) >> 0;
          myLucky.current.stop(index);
        }, 1000);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEnd = (prize) => {
    const prizeText = prize.fonts.map((font) => font.text).join("");
    Swal.fire({
      title: "恭喜你抽到 " + prizeText + " 🎉",
      text: "優惠卷將於 7 天後過期，請儘速使用！",
      icon: "Success",
    });

    // Get the current time
    const currentTime = new Date().toISOString();

    // API call to save the prize to the database
    const requestBody = {
      data: {
        prize: prizeText,
        time: currentTime,
      },
    };

    savePrizeToDB(requestBody);
  };

  const savePrizeToDB = async (prize) => {
    try {
      const response = await axios.post(
        `https://${elasticIp}/api/1.0/order/prize`,
        prize,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
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

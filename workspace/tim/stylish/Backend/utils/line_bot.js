require("dotenv").config();
const line = require("@line/bot-sdk");
const userService = require("../Service/userService");
const orderService = require("../Service/orderService");
// const

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
const client = new line.Client(config);

async function handleJoinEvent(event) {
  const welcomeMessage = {
    type: "text",
    text: "歡迎加入 stylish 機器人！\n請輸入 訂單 ID 和 用戶名稱 來追蹤訂單資訊呦～\n例如：\n1234567 用戶名稱",
  };

  await client.replyMessage(event.replyToken, welcomeMessage);
}

async function handleTextMessageEvent(res, event) {
  console.log("handleTextMessageEvent:");
  const messageText = event.message.text;

  // 檢查是否符合訂單查詢格式
  const orderQueryRegex = /^(\d+) (.+)$/;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(messageText)) {
    // 如果是合法的 email，則執行使用者名稱查詢邏輯
    const response = await userService.getProfileByEmail(res, messageText);
    if (response.length > 0) {
      const responseMessage = [];

      // 訂單查詢
      const orderList = await orderService.getOrderList(res, response[0].id);
      console.log(orderList);

      // 歡迎訊息
      responseMessage.push({
        type: "text",
        text: `Hello ${response[0].name}: `,
      });

      // 訂單回覆
      orderList.forEach((order) => {
        const paymentStatus = order.isPaid ? "已付款" : "未付款";
        const shippingStatus = order.shipping_status;

        responseMessage.push({
          type: "text",
          text: `訂單編號：${order.id}\n付款狀態：${paymentStatus}\n運送狀態：${shippingStatus}`,
        });
      });

      // 一次性發送所有訊息
      await client.replyMessage(event.replyToken, responseMessage);
    } else {
      await client.replyMessage(event.replyToken, {
        type: "text",
        text: `輸入的 ID 或 用戶名稱有誤，請重新輸入！`,
      });
    }
  } else if (orderQueryRegex.test(messageText)) {
    // 如果符合訂單查詢格式，則執行訂單查詢邏輯
    const [, orderId, username] = messageText.match(orderQueryRegex);
    const orderInfo = await orderService.getOrderInfo(res, orderId, username);

    if (orderInfo) {
      await client.replyMessage(event.replyToken, {
        type: "text",
        text: `訂單編號 ${orderId} 的詳細資訊： ${orderInfo}`,
      });
    } else {
      await client.replyMessage(event.replyToken, {
        type: "text",
        text: `找不到符合條件的訂單，請檢查輸入是否正確！`,
      });
    }
  } else {
    // 其他情況，回覆錯誤訊息
    await client.replyMessage(event.replyToken, {
      type: "text",
      text: `輸入的用戶名稱、Email或訂單查詢格式有誤，請重新輸入！`,
    });
  }
}

module.exports = {
  handleEvent: async (res, event) => {
    if (event.type === "join" && event.source.type === "group") {
      await handleJoinEvent(event);
    }

    if (event.type === "message" && event.message.type === "text") {
      await handleTextMessageEvent(res, event);
    }
  },
  line,
  config,
  client,
};

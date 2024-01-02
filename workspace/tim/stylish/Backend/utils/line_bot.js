require('dotenv').config();
const line = require('@line/bot-sdk');
// const 

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
const client = new line.Client(config);

async function handleJoinEvent(event) {
  const welcomeMessage = {
    type: 'text',
    text: '歡迎加入 stylish 機器人！\n請輸入 訂單 ID 和 用戶名稱 來追蹤訂單資訊呦～\n例如：\n1234567 用戶名稱',
  };

  await client.replyMessage(event.replyToken, welcomeMessage);
}

async function handleTextMessageEvent(event) {
  console.log('handleTextMessageEvent:');
  const messageText = event.message.text;
  var id = '';
  if (messageText.includes(' ')) var [id, user_name] = messageText.split(' ');

  if (/^-?\d+$/.test(id)) {
    if (await tripModel.isCreator(id, user_name)) {
    //   await tripModel.addLineGroupId(event.source.groupId, parseInt(id));
    //   const tripName = await tripModel.getTripName(parseInt(id));
      await client.replyMessage(event.replyToken, {
        type: 'text',
        text: `Hello『${user_name}』，你的訂單編號為『${id}』`,
      });
    } else {
      await client.replyMessage(event.replyToken, {
        type: 'text',
        text: `輸入的 ID 或 用戶名稱有誤，請重新輸入！`,
      });
    }
  }
  else {
    await client.replyMessage(event.replyToken, {
      type: 'text',
      text: `輸入的 ID 或 用戶名稱有誤，請重新輸入！`,
    });
  }
}

module.exports = {
  handleEvent: async (event) => {
    console.log('Lineevent:', event);
    if (event.type === 'join' && event.source.type === 'group') {
      await handleJoinEvent(event);
    }

    if (event.type === 'message' && event.message.type === 'text') {
      await handleTextMessageEvent(event);
    }
  },
  line,
  config,
  client,
};

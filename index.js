const express = require('express');
const line = require('@line/bot-sdk');

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// 解析 JSON
app.use(express.json());

// Webhook 主入口（LINE 會 POST 到這裡）
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// 處理事件
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const replyText = event.message.text;

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: "你傳了：「" + replyText + "」",
  });
}

const client = new line.Client(config);

// Render 必須 listen PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot is running on port ${PORT}`);
});

const express = require("express");
const line = require("@line/bot-sdk");

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const app = express();
app.use(express.json());
app.use("/webhook", line.middleware(config), (req, res) => {
  res.sendStatus(200);
});

app.post("/webhook", async (req, res) => {
  const events = req.body.events;
  for (const event of events) {
    if (event.type === "message" && event.message.type === "text") {
      console.log("收到訊息：", event.message.text);
    }
  }
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Bot is running on port 3000");
});

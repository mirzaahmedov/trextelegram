const express = require("express")
const path = require("path")
const TelegramBot = require("node-telegram-bot-api")

const GAME = "drago"
const PORT = process.env.PORT
const TOKEN = ""

const queries = {}

const bot = new TelegramBot()
const app = express()

express.use(express.static(path.join(path.join(__dirname, "public"))))

bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, GAME));

bot.on("callback_query", function (query) {

  if (query.game_short_name !== GAME) {

    bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");

  } else {

    queries[query.id] = query;

    let gameurl = "https://YOUR_URL_HERE/index.html?  id="+query.id;

    bot.answerCallbackQuery({

      callback_query_id: query.id,

      url: gameurl

    });

  }

});

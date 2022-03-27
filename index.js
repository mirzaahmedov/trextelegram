const express = require("express")
const path = require("path")
const TelegramBot = require("node-telegram-bot-api")

const GAME = "drago"
const PORT = process.env.PORT || 3000
const TOKEN = "5226985158:AAHDbWHIXP7RaH2hjG3UVP6maogbP7eK0To"

const queries = {}

const bot = new TelegramBot(TOKEN, { polling: true })
const app = express()

app.use(express.static(path.join(path.join(__dirname, "public"))))

bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, GAME));

bot.on("callback_query", function (query) {

  if (query.game_short_name !== GAME) {

    bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");

  } else {

    queries[query.id] = query;

    let gameurl = "https://trextelegram.herokuapp.com?id="+query.id;

    bot.answerCallbackQuery({

      callback_query_id: query.id,

      url: gameurl

    });

  }

})

app.listen(PORT, () => console.log("listening on port " + PORT))

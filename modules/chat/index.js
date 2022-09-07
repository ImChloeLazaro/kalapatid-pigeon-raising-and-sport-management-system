
const express = require("express")
const controller = require("./controller/controller")
const chat = express.Router()


chat.get("/", controller.GET_CHATS)
chat.get("/club/:id", controller.GET_CHAT)
chat.post("/club/:id", controller.POST_CHAT)


module.exports = chat

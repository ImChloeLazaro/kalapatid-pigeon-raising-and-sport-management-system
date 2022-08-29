
const express = require("express")
const controller = require("./controller/controller")
const chat = express.Router()

chat.get("/", controller.GET_CHAT)
chat.post("/", controller.POST_CHAT)

module.exports = chat;
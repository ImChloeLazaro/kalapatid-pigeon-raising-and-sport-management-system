const express = require("express")
const controller = require("./controller/controller")

const messaging = express.Router()
messaging.get('/', controller.GET_MESSAGE)
messaging.get("/:id", controller.GET_MESSAGE_ID)
messaging.post("/:id", controller.POST_MESSAGE_ID)
messaging.post("/:id/delete", controller.DELETE_MESSAGE_ID)
module.exports = messaging;

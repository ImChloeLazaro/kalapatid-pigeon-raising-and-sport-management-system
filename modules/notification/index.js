const express = require("express")
const controller = require("./controller/controller")


const notification = express.Router()

notification.post("/", controller.POST_NOTIFICATION)

module.exports = notification;








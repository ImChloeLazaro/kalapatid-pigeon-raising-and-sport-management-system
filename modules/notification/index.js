const express = require("express")
const controller = require("./controller/controller")


const notification = express.Router()

notification.get("/", controller.GET_NOTIFICATION)

module.exports = notification;








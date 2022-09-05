const express = require("express")

const controller = require('./controller/controller')
const event = express.Router()

event.get("/", controller.GET_EVENT)
event.get("/show/:id", controller.SHOW_EVENT_ID)
event.get("/create", controller.GET_CREATE_EVENT)
event.post("/create", controller.POST_CREATE_EVENT)

module.exports = event;


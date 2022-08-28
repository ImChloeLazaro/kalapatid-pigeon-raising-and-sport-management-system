const express = require("express")

const controller = require('./controller/controller')
const event = express.Router()

event.get("/", controller.GET_EVENT)
event.get("/:id", controller.GET_EVENT_ID)
event.post("/create", controller.POST_CREATE_EVENT)
event.post("/save", controller.POST_SAVE_EVENT)

module.exports = event;


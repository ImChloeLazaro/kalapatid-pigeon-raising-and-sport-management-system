const express = require("express")

const controller = require('./controller/controller')
const event = express.Router()

event.get("/", controller.GET_EVENT)
event.get("/show", controller.SHOW_EVENT_ID)
event.get("/edit", controller.GET_EDIT_EVENT_ID)
event.post("/edit", controller.POST_EDIT_EVENT_ID)
event.get("/create", controller.GET_CREATE_EVENT)
event.post("/create", controller.POST_CREATE_EVENT)
event.get("/delete", controller.GET_DELETE_EVENT)
event.post("/delete", controller.POST_DELETE_EVENT)

event.get("/participant", controller.GET_PARTICIPANT)
event.get("/participant/remove", controller.GET_PARTICIPANT_REMOVE)
event.post("/participant/update", controller.UPDATE_PARTICIPANT)
event.get("/participant/request", controller.GET_PARTICIPANT_REQUEST)
event.post("/participant/request", controller.POST_PARTICIPANT_REQUEST)

module.exports = event;


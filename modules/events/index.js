const express = require("express")

const controller = require('./controller/controller')
const event = express.Router()

event.get("/", controller.GET_EVENT)
event.get("/show", controller.SHOW_EVENT_ID)
event.get("/edit", controller.EDIT_EVENT_ID)
event.get("/create", controller.GET_CREATE_EVENT)
event.post("/create", controller.POST_CREATE_EVENT)
event.post("/delete", controller.POST_DELETE_EVENT)

// event.get("/add-participant/:eventId", controller.GET_ADD_PARTICIPANT)
// event.post("/add-participant/:eventId", controller.POST_ADD_PARTICIPANT)


event.get("/participant", controller.GET_PARTICIPANT)
event.post("/participant/update", controller.UPDATE_PARTICIPANT)
event.get("/participant/request", controller.GET_PARTICIPANT_REQUEST)
event.post("/participant/request", controller.POST_PARTICIPANT_REQUEST)

module.exports = event;


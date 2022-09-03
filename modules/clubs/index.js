const express = require("express")
const controller = require("./controller/controller")
const club = express.Router()

club.get("/", controller.GET_CLUB)
club.get("/show/:id", controller.SHOW_CLUB_ID)
club.get("/create", controller.GET_CREATE_CLUB)
club.post("/create", controller.POST_CREATE_CLUB)

module.exports = club;
const express = require("express")
const controller = require("./controller/controller")
const club = express.Router()

club.get("/", controller.GET_CLUB)
club.get("/show", controller.SHOW_CLUB_ID)
club.get("/create", controller.GET_CREATE_CLUB)
club.post("/create", controller.POST_CREATE_CLUB)
club.get("/add-member/:clubId", controller.GET_ADD_MEMBER)
club.post("/add-member/:clubId", controller.POST_ADD_MEMBER)

module.exports = club;
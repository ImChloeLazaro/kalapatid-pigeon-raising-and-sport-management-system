const express = require("express")
const controller = require("./controller/controller")
const club = express.Router()

club.get("/", controller.GET_CLUB)
club.get("/show", controller.SHOW_CLUB_ID)
club.get("/edit", controller.GET_EDIT_CLUB_ID)
club.post("/edit", controller.POST_EDIT_CLUB_ID)
club.get("/create", controller.GET_CREATE_CLUB)
club.post("/create", controller.POST_CREATE_CLUB)
club.get("/delete", controller.GET_DELETE_CLUB_ID)

club.post("/membership", controller.POST_MEMBERSHIP_HANDLE_REQUEST)
club.post("/membership/request", controller.POST_MEMBERSHIP_REQUEST)
club.post("/membership/unjoin", controller.POST_MEMBERSHIP_UNJOIN)


module.exports = club;
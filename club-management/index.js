const express = require("express")
const controller = require("./controller/controller")
const club = express.Router()


club.get("/", controller.GET_CLUB)
club.get("/:id", controller.GET_CLUB_ID)
club.post("/create", controller.POST_CREATE_CLUB)
club.post("/save", controller.POST_SAVE_CLUB)




module.exports = club;
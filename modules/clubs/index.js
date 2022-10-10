const express = require("express")
const controller = require("./controller/controller")
const club = express.Router()

club.get("/", controller.GET_CLUB)
club.get("/show", controller.GET_SHOW_CLUB_ID)
club.get("/edit", controller.GET_EDIT_CLUB_ID)
club.post("/edit", controller.POST_EDIT_CLUB_ID)
club.get("/create", controller.GET_CREATE_CLUB)
club.post("/create", controller.POST_CREATE_CLUB)
club.get("/delete", controller.GET_DELETE_CLUB_ID)

club.post("/membership", controller.POST_MEMBERSHIP_HANDLE_REQUEST)
club.post("/membership/request", controller.POST_MEMBERSHIP_REQUEST)
club.post("/membership/unjoin", controller.POST_MEMBERSHIP_UNJOIN)

club.post("/membership/moderator/set", controller.POST_MODERATOR_SET)
club.post("/membership/moderator/remove", controller.POST_MODERATOR_REMOVE)






club.get('/announcement/create', controller.GET_CLUB_ANNOUNCEMENT_CREATE)
club.get('/announcement/show', controller.GET_CLUB_ANNOUNCEMENT_SHOW)
club.get('/announcement/edit', controller.GET_CLUB_ANNOUNCEMENT_EDIT)
club.get('/announcement/delete', controller.GET_CLUB_ANNOUNCEMENT_DELETE)


club.post('/announcement/create', controller.POST_CLUB_ANNOUNCEMENT_CREATE)
club.post('/announcement/edit', controller.POST_CLUB_ANNOUNCEMENT_EDIT)


module.exports = club;
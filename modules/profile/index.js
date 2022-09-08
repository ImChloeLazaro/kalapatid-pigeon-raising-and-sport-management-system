const express = require("express")
const controller = require("./controller/controller")

const profile = express.Router()

profile.get('/', controller.GET_PROFILE)
profile.get('/edit', controller.EDIT_PROFILE)
profile.get('/message', controller.GET_PROFILE_MESSAGEME_ID)




module.exports = profile;







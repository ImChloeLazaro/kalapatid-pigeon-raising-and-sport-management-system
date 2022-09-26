const express = require("express")
const controller = require("./controller/controller")

const profile = express.Router()

profile.get('/', controller.GET_PROFILE)
profile.get('/edit', controller.GET_EDIT_PROFILE)
profile.post('/edit', controller.POST_EDIT_PROFILE)
profile.get('/message', controller.GET_PROFILE_MESSAGEME_ID)




module.exports = profile;







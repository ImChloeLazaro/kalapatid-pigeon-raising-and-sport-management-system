const express = require("express")
const controller = require("./controller/controller")

const profile = express.Router()

profile.get('/', controller.GET_PROFILE)
profile.get('/:username', controller.GET_PROFILE_ID)
// profile.get('/messageme', controller.GET_PROFILE_MESSAGEME)
profile.get('/message/:username', controller.GET_PROFILE_MESSAGEME_ID)




module.exports = profile;







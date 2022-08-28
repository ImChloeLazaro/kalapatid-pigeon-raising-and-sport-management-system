const express = require("express")
const controller = require("./controller/controller")

const profile = express.Router()

profile.get('/', controller.GET_PROFILE)
profile.get('/messageme', controller.GET_PROFILE_MESSAGEME)



module.exports = profile;







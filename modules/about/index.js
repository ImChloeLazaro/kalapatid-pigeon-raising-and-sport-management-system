
const express = require("express")
const controller = require("./controller/controller")
const about = express.Router()

about.get("/", controller.GET_ABOUT)
module.exports = about

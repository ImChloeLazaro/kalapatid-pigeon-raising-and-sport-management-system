
const express = require("express")
const controller = require("./controller/controller")
const help = express.Router()

help.get("/", controller.GET_HELP)
module.exports = help

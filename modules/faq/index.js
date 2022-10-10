
const express = require("express")
const controller = require("./controller/controller")
const faq = express.Router()

faq.get("/", controller.GET_FAQ)
module.exports = faq

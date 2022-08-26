const express = require("express")
const globalConstants = require("../constants/constants")
const constants = require("./constants")
const notification = express.Router()
const { verifyLogin } = require("../lib/toolkit")

notification.get("/", (req, res) => {
  verifyLogin(req, res, (username) => {
    return res.render("notification/index.html", {
      ctx: globalConstants.ctx,
      title: constants.TITLE
    })
  })

})

module.exports = notification;








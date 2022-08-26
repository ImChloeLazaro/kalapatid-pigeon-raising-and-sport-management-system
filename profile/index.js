const express = require("express")
const constants = require("./constants")
const globalConstants = require("../constants/constants")
// const dbf = require('./db/db-functions')
const { verifyLogin } = require("../lib/toolkit")

const profile = express.Router()


profile.get("/", (req, res) => {
  verifyLogin(req, res, (username) => {
    return res.render("profile/profile.html", {
      ctx: globalConstants.ctx,
      title: constants.TITLE
    });
  })

})





profile.get("/messageme", (req, res) => {
  verifyLogin(req, res, (username) => {
    const id = new require("mongodb").ObjectId().toString()
    return res.redirect(globalConstants.ctx.DOMAIN_NAME + '/messages/' + id)
  })
})



module.exports = profile;







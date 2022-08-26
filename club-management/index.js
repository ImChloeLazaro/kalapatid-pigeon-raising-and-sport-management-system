const express = require("express")
const globalConstants = require("../constants/constants")
const constants = require("./constants")
const { verifyLogin } = require("../lib/toolkit")

const club = express.Router()



let clubs = [
  { _id: 1, name: "club 1" },
  { _id: 2, name: "club 2" },
  { _id: 3, name: "club 3" },
  { _id: 4, name: "club 4" },
  { _id: 5, name: "club 5" },
  { _id: 6, name: "club 6" },
  { _id: 7, name: "club 7" },
  { _id: 8, name: "club 8" },
]

club.get("/", (req, res) => {
  verifyLogin(req, res, (username) => {
    return res.render("club/index.html", {
      ctx: globalConstants.ctx,
      title: constants.TITLE,
      clubs: clubs
    });
  })

})
club.get("/:id", (req, res) => {
  verifyLogin(req, res, (username) => {
    console.log(req.query)
    return res.render("club/show-club.html", {
      ctx: globalConstants.ctx,
      title: constants.TITLE,
      clubs: clubs
    });
  })

})





club.post("/create", (req, res) => {
  verifyLogin(req, res, (username) => {

    let clubName = req.body.clubName
    return res.render("club/create-club.html", {
      ctx: globalConstants.ctx,
      title: constants.TITLE,
      clubName: clubName
    })
  })
})

club.post("/save", (req, res) => {
  verifyLogin(req, res, (username) => {
    let data = req.body
    console.log(data)
    return res.redirect(globalConstants.ctx.DOMAIN_NAME + '/clubs')

  })
})




module.exports = club;
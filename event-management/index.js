const express = require("express")
const globalConstants = require("../constants/constants")
const constants = require("./constants")
const { verifyLogin } = require("../lib/toolkit")

const event = express.Router()
let events = [
  { _id: 1, name: "event 1" },
  { _id: 2, name: "event 2" },
  { _id: 3, name: "event 3" },
  { _id: 4, name: "event 4" },
  { _id: 5, name: "event 5" },
  { _id: 6, name: "event 6" },
  { _id: 7, name: "event 7" },
  { _id: 8, name: "event 8" },
]

event.get("/", (req, res) => {
  verifyLogin(req, res, (username) => {
    return res.render("event/index.html", {
      ctx: globalConstants.ctx,
      title: constants.TITLE,
      events: events
    });
  })

})
event.get("/:id", (req, res) => {
  verifyLogin(req, res, (username) => {
    console.log(req.query)
    return res.render("event/show-event.html", {
      ctx: globalConstants.ctx,
      title: constants.TITLE,
      events: events
    });
  })

})





event.post("/create", (req, res) => {
  verifyLogin(req, res, (username) => {

    let eventName = req.body.eventName
    return res.render("event/create-event.html", {
      ctx: globalConstants.ctx,
      title: constants.TITLE,
      eventName: eventName
    })
  })
})

event.post("/save", (req, res) => {
  verifyLogin(req, res, (username) => {
    let data = req.body
    console.log(data)
    return res.redirect(globalConstants.ctx.DOMAIN_NAME + '/events')

  })
})




module.exports = event;


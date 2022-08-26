const express = require("express")

const lib = require('./lib/lib')
const dbf = require('./db/db-functions')
const globalConstants = require("../constants/constants")
const constants = require("./constants")
const model = require('./model/models')
const { verifyLogin } = require("../lib/toolkit")


const ObjectId = require("mongodb").ObjectId

const messaging = express.Router()


messaging.get("/", (req, res) => {
  verifyLogin(req, res, (username) => {
    dbf.getAllMessageData((err, docs) => {
      return res.render("messaging/index.html", {
        ctx: globalConstants.ctx,
        title: constants.TITLE,
        data: lib.uniqueIDArray(docs)
      });
    })
  })

})





messaging.get("/:id", (req, res) => {
  verifyLogin(req, res, (username) => {

    let messageId = new ObjectId(req.params.id)
    console.log(messageId)
    dbf.getMessageDataById(messageId, (err, docs) => {
      let messages = docs
      return res.render("messaging/message.html", {
        ctx: globalConstants.ctx,
        title: constants.TITLE,
        messages: messages,
        messageId: req.params.id

      });
    })
  })
})





messaging.post("/:id", (req, res) => {
  verifyLogin(req, res, (username) => {

    let username1 = 'marcuwynu23'
    let username2 = 'dymaru23'
    let messageId = new ObjectId(req.params.id)
    let id = new ObjectId()


    dbf.insertMessageData(model.Message(id, messageId, username1, username2, req.body.msg), (err) => {
      if (err == null) {
        dbf.getMessageDataById(messageId, (err, docs) => {
          let messages = docs
          return res.render("messaging/message.html", {
            ctx: globalConstants.ctx,
            title: constants.TITLE,
            messages: messages,
            messageId: req.params.id
          });
        })
      } else {
        console.error("Error.")
        return res.render("messaging/message.html", {
          ctx: globalConstants.ctx,
          title: constants.TITLE,
          messages: null,
          messageId: req.params.id
        });
      }
    })
  })

})




module.exports = messaging;





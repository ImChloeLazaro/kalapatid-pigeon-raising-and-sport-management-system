
const express = require("express")
const globalConstants = require("../constants/constants")
const dbf = require('./db/db-functions')
const model = require('./model/models')
const chat = express.Router()




chat.get("/", (req, res) => {
  dbf.getAllChatData((err, docs) => {
    return res.render("chat/index.html", {
      ctx: globalConstants.ctx,
      data: docs
    });
  })
})


const ObjectId = require('mongodb').ObjectId

chat.post("/", (req, res) => {
  let username = "marcuwynu23";
  dbf.insertChatData(model.Chat(new ObjectId(), username, req.body.chat), (err) => {
    if (err == null) {
      dbf.getAllChatData((err, docs) => {
        return res.render("chat/index.html", {
          ctx: globalConstants.ctx,
          data: docs
        });
      })
    } else {
      return res.render("chat/index.html", {
        ctx: globalConstants.ctx,
        data: null
      });
    }
  })

})



module.exports = chat;
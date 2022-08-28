
const express = require("express")
const globalConstants = require("../constants/constants")
const { verifyLogin } = require("../lib/toolkit")
const dbf = require('./db/db-functions')
const model = require('./model/models')
const chat = express.Router()




chat.get("/", (req, res) => {
  verifyLogin(req, res, () => {
    dbf.getAllChatData((err, docs) => {
      return res.render("chat/index.html", {
        ctx: globalConstants.ctx,
        data: docs
      });
    })
  })
})


const ObjectId = require('mongodb').ObjectId

chat.post("/", (req, res) => {
  verifyLogin(req, res, (accountId, username) => {
    dbf.insertChatData(model.Chat(new ObjectId(), accountId, username, req.body.chat), (err) => {
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
})



module.exports = chat;
const express = require("express")
const controller = require("./controller/controller")

const posting = express.Router()

posting.get("/", controller.GET_POSTING)
posting.post("/", controller.POST_POSTING)
posting.post("/comments", controller.POST_POSTING_COMMENT)



module.exports = posting;







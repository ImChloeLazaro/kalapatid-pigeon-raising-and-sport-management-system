const express = require("express")
const controller = require("./controller/controller")

const posting = express.Router()

posting.get("/", controller.GET_POSTING)
posting.post("/", controller.POST_POSTING)
posting.post("/edit", controller.POST_POST_EDIT)
posting.post("/delete", controller.POST_POST_DELETE)
posting.post("/comments", controller.POST_POSTING_COMMENT)
posting.post("/comments/delete", controller.POST_POSTING_COMMENT_DELETE)
module.exports = posting;







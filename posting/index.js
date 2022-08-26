const express = require("express")
const globalConstants = require("../constants/constants")
const constants = require("./constants")
const model = require('./model/model')
const dbf = require('./db/db-functions')
const { verifyLogin } = require("../lib/toolkit")



const posting = express.Router()



posting.get("/", (req, res) => {
  verifyLogin(req, res, (username) => {
    dbf.getAllPostData((err, docs) => {
      let posts = docs
      return res.render("posting/index.html", {
        ctx: globalConstants.ctx,
        title: constants.TITLE,
        posts: posts,
        comments: null
      });
    })
  })

})

posting.post("/", (req, res) => {
  verifyLogin(req, res, (username) => {
    dbf.insertPostData(model.Post(new require('mongodb').ObjectId(), req.body.post), (err, docs) => {
      if (err == null) {
        dbf.getAllPostData((err, docs) => {
          let posts = docs
          dbf.getAllCommentData((err, docs) => {
            let comments = docs
            return res.render("posting/index.html", {
              ctx: globalConstants.ctx,
              title: constants.TITLE,
              posts: posts,
              comments: comments
            });
          })

        })
      } else {
        return res.render("posting/index.html", {
          context: {
            title: constants.TITLE,
            posts: null
          }
        });
      }
    })
  })

})




posting.post("/comments", (req, res) => {
  verifyLogin(req, res, (username) => {
    let comment = req.body.comment
    let commentId = new require('mongodb').ObjectId()
    let postId = new require('mongodb').ObjectId(req.body.postId)

    console.log(comment)
    dbf.insertCommentData(model.Comment(commentId, postId, comment), (err) => {
      if (err == null) {
        dbf.getAllPostData((err, docs) => {
          let posts = docs
          dbf.getAllCommentData((err, docs) => {
            let comments = docs
            return res.render("posting/index.html", {
              ctx: globalConstants.ctx,
              title: constants.TITLE,
              posts: posts,
              comments: comments
            });
          })
        })
      } else {
        return res.render("posting/index.html", {
          ctx: globalConstants.ctx,
          title: constants.TITLE,
          posts: null,
          comments: null
        });
      }
    })

  })

})



module.exports = posting;







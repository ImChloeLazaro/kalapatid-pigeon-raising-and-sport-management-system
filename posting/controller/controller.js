const globalConstants = require("../../constants/constants")
const model = require('../model/model')
const dbf = require('../db/db-functions')
const { verifyLogin, datetimenow } = require("../../lib/toolkit")



const GET_POSTING = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		dbf.getAllPostData((err, docs) => {
			let posts = docs
			dbf.getAllCommentData((err, docs) => {
				let comments = docs
				return res.render("posting/index.html", {
					ctx: globalConstants.ctx,
					posts: posts,
					comments: comments
				});
			})
		})
	})

}

const POST_POSTING = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let id = new require('mongodb').ObjectId()
		let datetime = datetimenow()
		let post = req.body.post


		dbf.insertPostData(model.Post(id, datetime, post), (err, docs) => {
			if (err == null) {
				dbf.getAllPostData((err, docs) => {
					let posts = docs
					dbf.getAllCommentData((err, docs) => {
						let comments = docs
						return res.render("posting/index.html", {
							ctx: globalConstants.ctx,
							posts: posts,
							comments: comments
						});
					})

				})
			} else {
				return res.render("posting/index.html", {
					ctx: globalConstants.ctx,
					posts: null
				});
			}
		})
	})

}

const POST_POSTING_COMMENT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let comment = req.body.comment
		let commentId = new require('mongodb').ObjectId()
		let postId = new require('mongodb').ObjectId(req.body.postId)
		let datetime = datetimenow()

		console.log(comment)
		dbf.insertCommentData(model.Comment(commentId, postId, datetime, comment), (err) => {
			if (err == null) {
				dbf.getAllPostData((err, docs) => {
					let posts = docs
					dbf.getAllCommentData((err, docs) => {
						let comments = docs
						return res.render("posting/index.html", {
							ctx: globalConstants.ctx,
							posts: posts,
							comments: comments
						});
					})
				})
			} else {
				return res.render("posting/index.html", {
					ctx: globalConstants.ctx,
					posts: null,
					comments: null
				});
			}
		})

	})

}





module.exports = {
	GET_POSTING: GET_POSTING,
	POST_POSTING: POST_POSTING,
	POST_POSTING_COMMENT: POST_POSTING_COMMENT
}
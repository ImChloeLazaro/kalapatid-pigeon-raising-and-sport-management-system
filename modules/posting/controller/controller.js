const globalConstants = require("../../../constants/constants")
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")
const model = require('../model/model')
const dbf = require('../db/db-functions')
const ObjectId = require('mongodb').ObjectId


function getAllPostData(filter, fn) {
	dbf.getAllPostData(filter, (err, docs) => {
		if (err) return
		let posts = docs
		fn(posts)
	})
}

function getAllCommentData(filter, fn) {
	dbf.getAllCommentData(filter, (err, docs) => {
		if (err) return
		let comments = docs
		fn(comments)
	})
}

function renderTemplate(res, accountId, posts, comments) {
	return res.render("posting/index.html", {
		ctx: globalConstants.ctx,
		accountId: accountId,
		posts: posts,
		comments: comments
	});
}


function redirectToPostView(res, err) {
	if (err == null) {
		return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/posts")
	} else {
		renderTemplate(res, accountId, null, null)
	}
}



const GET_POSTING = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		// let accountIdObj = new ObjectId(accountId)
		let filter = {}
		getAllPostData(filter, (posts) => {
			getAllCommentData(filter, (comments) => {
				renderTemplate(res, accountId, posts, comments)
			})
		})
	})
}

const POST_POSTING = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let post = req.body.post
		let datetime = datetimenow()
		let postModel = model.Post(accountId, datetime, post)

		dbf.insertPostData(postModel, (err) => {
			redirectToPostView(res, err)
		})
	})

}


const POST_POST_DELETE = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let filter = { _id: new ObjectId(req.body.postId) }
		dbf.deletePostData(filter, (err) => {
			redirectToPostView(res, err)
		})

	})
}





const POST_POSTING_COMMENT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let comment = req.body.comment
		let postId = req.body.postId
		let datetime = datetimenow()
		let commentModel = model.Comment(accountId, postId, datetime, comment)
		dbf.insertCommentData(commentModel, (err) => {
			redirectToPostView(res, err)
		})

	})
}


const POST_POSTING_COMMENT_DELETE = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let filter = { _id: new ObjectId(req.body.commentId) }
		dbf.deleteCommentData(filter, (err) => {
			redirectToPostView(res, err)
		})

	})
}


module.exports = {
	GET_POSTING: GET_POSTING,
	POST_POSTING: POST_POSTING,
	POST_POST_DELETE: POST_POST_DELETE,
	POST_POSTING_COMMENT: POST_POSTING_COMMENT,
	POST_POSTING_COMMENT_DELETE: POST_POSTING_COMMENT_DELETE
}
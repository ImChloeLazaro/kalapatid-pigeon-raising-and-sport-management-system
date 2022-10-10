const globalConstants = require("../../../constants/constants")
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")
const { getAllEventDataBy } = require('../../events/db/db-functions')
const { getAllClubDataBy, getClubAllMemberDataBy } = require('../../clubs/db/db-functions')
const { getAllAcountData } = require('../../authentication/db/db-functions')
const { getAllProfileDataBy } = require("../../profile/db/db-functions")
const model = require('../model/model')
const dbf = require('../db/db-functions')
const ObjectId = require('mongodb').ObjectId


// database query functions
function getAllPostData(filter, fn) {
	dbf.getAllPostData(filter, (err, docs) => {
		if (err) return
		fn(docs)
	})
}

function getAllCommentData(filter, fn) {
	dbf.getAllCommentData(filter, (err, docs) => {
		if (err) return
		fn(docs)
	})
}

function queries(filter, fn) {
	getAllAcountData((err, accounts) => {
		getAllProfileDataBy(filter, (err, profiles) => {
			getAllClubDataBy(filter, (err, clubs) => {
				getClubAllMemberDataBy(filter, (err, clubMembers) => {
					getAllEventDataBy(filter, (err, events) => {
						getAllPostData(filter, (posts) => {
							getAllCommentData(filter, (comments) => {
								fn(accounts, profiles, posts, comments, events, clubs, clubMembers)
							})
						})
					})
				})
			})
		})
	})
}


// template renderString
function renderTemplate(res, accountId, username, accounts, profiles, posts, comments, events, clubs, clubMembers) {
	return res.render("feeds/index.html", {
		ctx: globalConstants.ctx,
		accountId: accountId,
		username: username,
		accounts: accounts,
		profiles: profiles,
		posts: posts,
		comments: comments,
		events: events,
		clubs: clubs,
		clubMembers: clubMembers
	});
}

//redirect 
function redirectToPostView(res, err) {
	if (err == null) {
		return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/feeds")
	} else {
		renderTemplate(res, accountId, username, null, null, null, null, null)
	}
}







//Controllers
const GET_POSTING = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let filter = {}
		queries(filter, (accounts, profiles, posts, comments, events, clubs, clubMembers) => {
			renderTemplate(res, accountId, username, accounts, profiles, posts, comments, events, clubs, clubMembers)
		})
	})
}

const POST_POSTING = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let post = req.body.post
		let datetime = datetimenow()
		let postModel = model.Post(accountId, username, datetime, post)

		dbf.insertPostData(postModel, (err) => {
			redirectToPostView(res, err)
		})
	})

}


const POST_POST_EDIT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let filter = { _id: new ObjectId(req.body.postId) }
		let setUpdate = { post: req.body.post }
		dbf.updatePostData(filter, setUpdate, (err) => {
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
		let commentModel = model.Comment(accountId, postId, username, datetime, comment)
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
	POST_POST_EDIT: POST_POST_EDIT,
	POST_POST_DELETE: POST_POST_DELETE,

	POST_POSTING_COMMENT: POST_POSTING_COMMENT,
	POST_POSTING_COMMENT_DELETE: POST_POSTING_COMMENT_DELETE
}
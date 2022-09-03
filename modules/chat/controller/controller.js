const globalConstants = require("../../../constants/constants")
const { verifyLogin } = require("../../../lib/toolkit")


const dbf = require('../db/db-functions')
const model = require('../model/models')
const ObjectId = require('mongodb').ObjectId


function template(res, username, docs) {
	return res.render("chat/index.html", {
		ctx: globalConstants.ctx,
		othername: username,
		data: docs
	})
}

function insertChatData(res, model, fn) {
	dbf.insertChatData(model, (err) => {
		if (err == null) {
			fn()
		} else {
			template(res, null)
		}
	})
}

function getAllChatData(res, username, filter) {
	dbf.getAllChatData(filter, (err, docs) => {
		template(res, username, docs)
	})
}



const GET_CHAT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		getAllChatData(res, username, {})
	})
}

const POST_CHAT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let chat = req.body.chat
		insertChatData(res, model.Chat(accountId, username, chat), () => {
			res.redirect(globalConstants.ctx.DOMAIN_NAME + "/chats")
		})
	})
}




module.exports = {
	GET_CHAT: GET_CHAT,
	POST_CHAT: POST_CHAT,
}
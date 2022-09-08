const dbf = require('../db/db-functions')
const model = require('../model/models')
const globalConstants = require("../../../constants/constants");
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")
const ObjectId = require('mongodb').ObjectId

function template(res, username, docs) {
	console.log(docs)
	return res.render("chat/index.html", {
		ctx: globalConstants.ctx,
		othername: username,
		data: docs
	})
}


function getAllChatData(res, username, filter) {
	dbf.getAllChatData(filter, (err, docs) => {
		template(res, username, docs)
	})
}


const GET_CHATS = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		console.log('new ObjectId: ', new ObjectId())
		getAllChatData(res, username, {})
	})
}

const GET_CHAT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.params.id
		let filter = { clubId: new ObjectId(clubId) }
		dbf.getAllChatData(filter, (err, docs) => {
			return res.render("chat/chat.html", {
				ctx: globalConstants.ctx,
				clubId: clubId,
				data: docs
			})
		})

	})
}

const POST_CHAT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let chat = req.body.chat
		let clubId = req.params.id
		let datetime = datetimenow()

		let chatModel = model.Chat(accountId, clubId, datetime, username, chat)
		dbf.insertChatData(chatModel, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/chats/club/" + clubId)
		})

	})
}




module.exports = {
	GET_CHATS: GET_CHATS,
	GET_CHAT: GET_CHAT,
	POST_CHAT: POST_CHAT,
}
const dbf = require('../db/db-functions')
const clubDbf = require("../../clubs/db/db-functions")
const model = require('../model/models')
const globalConstants = require("../../../constants/constants");
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")
const ObjectId = require('mongodb').ObjectId

function template(res, accountId, username, docs) {
	console.log("template accountId: ".bgWhite.red, accountId);
	return res.render("chat/index.html", {
		ctx: globalConstants.ctx,
		accountId: accountId,
		username: username,
		othername: username,
		data: docs
	})
}


function getAllChatData(res, accountId, username, filter) {
	dbf.getAllChatData(filter, (err, docs) => {
		template(res, accountId, username, docs)
	})
}


const GET_CHATS = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		getAllChatData(res, accountId, username, {})
	})
}


const GET_CHAT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.query.clubId
		let filter = { clubId: new ObjectId(clubId) }
		dbf.getAllChatData(filter, (err, docs) => {
			console.log(docs);
			return res.render("chat/chat.html", {
				ctx: globalConstants.ctx,
				accountId: accountId,
				username: username,
				clubId: clubId,
				data: docs
			})
		})

	})
}

const POST_CHAT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let chat = req.body.chat
		let clubId = req.query.clubId
		let datetime = datetimenow()
		let filter = { _id: new ObjectId(clubId) }
		clubDbf.getClubDataBy(filter, (err, docs) => {
			let clubName = docs.name;
			let chatModel = model.Chat(accountId, clubId, clubName, datetime, username, chat)
			dbf.insertChatData(chatModel, (err) => {
				return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/chats/show?clubId=" + clubId)
			})
		})
	})
}




module.exports = {
	GET_CHATS: GET_CHATS,
	GET_CHAT: GET_CHAT,
	POST_CHAT: POST_CHAT,
}
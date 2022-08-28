const dbf = require('../db/db-functions')
const model = require('../model/models')
const globalConstants = require("../../constants/constants")
const { verifyLogin, datetimenow } = require("../../lib/toolkit")
const ObjectId = require("mongodb").ObjectId




const GET_MESSAGE = (req, res) => {
	const dbquery = (callback) => {
		dbf.getAllMessageData((err, docs) => {
			if (err) {
				callback(null)
				return
			}
			callback(docs)
		})
	}
	const template = (docs) => {
		return res.render("messaging/index.html", {
			ctx: globalConstants.ctx,
			data: docs
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		dbquery(template)
	})
}


const GET_MESSAGE_ID = (req, res) => {
	const dbquery = (messageId, callback) => {
		dbf.getMessageDataById(messageId, (err, docs) => {
			let messages = docs
			if (err) {
				callback(null)
				return
			}
			callback(messages)
		})
	}
	const template = (messages) => {
		return res.render("messaging/message.html", {
			ctx: globalConstants.ctx,
			messages: messages,
			messageId: req.params.id
		});
	}


	verifyLogin(req, res, (accountId, username) => {
		let messageId = new ObjectId(req.params.id)
		dbquery(messageId, template)
	})
}

const POST_MESSAGE_ID = (req, res) => {
	const dbquery = (messageId, messageModel, callback) => {
		dbf.insertMessageData(messageModel, (err) => {
			if (err == null) {
				dbf.getMessageDataById(messageId, (err, docs) => {
					let messages = docs
					callback(messages)
				})
			} else {
				console.error("Error.")
				callback(null)
			}
		})
	}

	const template = (messages) => {
		return res.render("messaging/message.html", {
			ctx: globalConstants.ctx,
			messages: messages,
			messageId: req.params.id
		});
	}

	verifyLogin(req, res, (accountId, username) => {
		let username1 = username
		let username2 = 'dymaru23'
		let messageId = new ObjectId(req.params.id)
		let id = new ObjectId()
		let datetime = datetimenow()
		let messageModel = model.Message(id, messageId, datetime, username1, username2, req.body.msg)
		dbquery(messageId, messageModel, template)
	})

}


module.exports = {
	GET_MESSAGE: GET_MESSAGE,
	GET_MESSAGE_ID: GET_MESSAGE_ID,
	POST_MESSAGE_ID: POST_MESSAGE_ID
}
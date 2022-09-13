const dbf = require('../db/db-functions')
const model = require('../model/models')
const globalConstants = require("../../../constants/constants");
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")
const ObjectId = require("mongodb").ObjectId






const GET_MESSAGE = (req, res) => {
	const dbquery = (curusername, fn) => {
		let filter = {
			$or: [{ username1: curusername }, { username2: curusername }]
		}
		dbf.getAllMessageData(filter, (err, docs) => {
			if (err) {
				fn(null)
				return
			}
			fn(docs)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		dbquery(username, (docs) => {
			return res.render("messaging/index.html", {
				ctx: globalConstants.ctx,
				username: username,
				data: docs,

			})
		})
	})
}







const GET_MESSAGE_ID = (req, res) => {
	const dbquery = (messageId, curusername, fn) => {
		let filter = {
			messageId: new ObjectId(messageId),
			$or: [{ username1: curusername }, { username2: curusername }],
		}
		dbf.getMessageDataById(filter, (err, docs) => {
			let messages = docs
			if (err) {
				fn(null)
				return
			}
			fn(messages)
		})


	}
	const template = (req, res, username1, username2, messages) => {
		let curuser = username1
		if (messages.length !== 0) {
			username1 = messages[0].username1
			username2 = messages[0].username2
		}
		otherusername = username2
		if (username2 == curuser) {
			otherusername = username1
		}
		return res.render("messaging/message.html", {
			ctx: globalConstants.ctx,
			otherusername: otherusername,
			username: username1,
			username1: username1,
			username2: username2,
			messages: messages,
			messageId: req.params.id
		});
	}

	verifyLogin(req, res, (accountId, username) => {
		let messageId = req.params.id
		dbquery(messageId, username, (messages) => {
			template(req, res, username, req.query.username, messages)
		})
	})
}

















const POST_MESSAGE_ID = (req, res) => {

	const dbquery = (messageId, accountId, curusername, messageModel, fn) => {
		dbf.insertMessageData(messageModel, (err) => {
			if (err == null) {
				let messageIdObj = new ObjectId(messageId)
				let accountIdObj = new ObjectId(accountId)
				let filter = {
					messageId: messageIdObj,
					$or: [{ username1: curusername }, { username2: curusername }]
				}
				dbf.getMessageDataById(filter, (err, docs) => {
					let messages = docs
					if (err) {
						fn(null)
						return
					}
					fn(messages)
				})
			} else {
				console.error("Error.")
				fn(null)
			}
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let username1 = username
		let username2 = req.query.username
		let messageId = req.params.id
		let datetime = datetimenow()
		let messageModel = model.Message(messageId, accountId, datetime, username1, username2, req.body.msg)
		dbquery(messageId, accountId, username1, messageModel, (messages) => {
			let redirectUrl = `${globalConstants.ctx.DOMAIN_NAME}/messages/${messageId}/?username=${username2}`
			return res.redirect(redirectUrl)
		})
	})


}




const DELETE_MESSAGE_ID = (req, res) => {
	let { mid, messageId, username } = req.body
	let filter = { _id: ObjectId(mid) }
	dbf.deleteDataById(filter, (err) => {
		if (err) return
		let redirectUrl = `${globalConstants.ctx.DOMAIN_NAME}/messages/${messageId}/?username=${username}`
		return res.redirect(redirectUrl)
	})



}


module.exports = {
	GET_MESSAGE: GET_MESSAGE,
	GET_MESSAGE_ID: GET_MESSAGE_ID,
	POST_MESSAGE_ID: POST_MESSAGE_ID,
	DELETE_MESSAGE_ID: DELETE_MESSAGE_ID
}
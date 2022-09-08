const globalConstants = require("../../../constants/constants")
const { verifyLogin } = require("../../../lib/toolkit")

const dbf = require('../db/db-functions')


const GET_PROFILE = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let othername = req.query.username
		if (othername === undefined || othername === username) {
			othername = username
		}
		req.session.othername = othername
		let accountFilter = { username: othername }
		dbf.getAccountDataBy(accountFilter, (err, docs) => {
			let accData = docs
			let addressFilter = { acc_id: accData._id }
			dbf.getAddressDataBy(addressFilter, (err, docs) => {
				let addrData = docs
				return res.render("profile/profile.html", {
					ctx: globalConstants.ctx,
					othername: othername,
					accData: accData,
					addrData: addrData
				})
			})
		})
	})
}


const EDIT_PROFILE = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let othername = req.query.username
		if (othername === undefined || othername === username) {
			othername = username
		}
		req.session.othername = othername
		let accountFilter = { username: othername }
		dbf.getAccountDataBy(accountFilter, (err, docs) => {
			let accData = docs
			let addressFilter = { acc_id: accData._id }
			dbf.getAddressDataBy(addressFilter, (err, docs) => {
				let addrData = docs
				return res.render("profile/edit-profile.html", {
					ctx: globalConstants.ctx,
					othername: othername,
					accData: accData,
					addrData: addrData
				})
			})
		})
	})
}





const GET_PROFILE_MESSAGEME_ID = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let othername = req.query.username
		console.log(othername)
		var messageId = null
		let filter = {
			$or: [
				{ username1: othername, username2: username },
				{ username1: username, username2: othername }
			]
		}
		dbf.getAllMessageDataBy(filter, (err, docs) => {
			messageId = new require("mongodb").ObjectId().toString()
			if (docs.length !== 0) {
				docs.forEach(data => {
					messageId = data.messageId.toString()
					console.log(messageId)
				})
			}
			console.log(docs)

			let redirectUrl = `${globalConstants.ctx.DOMAIN_NAME}/messages/${messageId}/?username=${othername}`
			return res.redirect(redirectUrl)
		})


	})
}



module.exports = {
	GET_PROFILE: GET_PROFILE,
	EDIT_PROFILE: EDIT_PROFILE,
	GET_PROFILE_MESSAGEME_ID: GET_PROFILE_MESSAGEME_ID
}


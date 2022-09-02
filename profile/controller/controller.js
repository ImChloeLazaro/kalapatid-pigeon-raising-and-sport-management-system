
const globalConstants = require("../../constants/constants")
const dbf = require('../db/db-functions')
const { verifyLogin } = require("../../lib/toolkit")

const GET_PROFILE = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let othername = req.query.username
		if (othername === undefined || othername === username) {
			othername = username
		}
		req.session.othername = othername
		return res.render("profile/profile.html", {
			ctx: globalConstants.ctx,
			othername: othername
		});
	})

}





const GET_PROFILE_MESSAGEME_ID = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let othername = req.params.username
		console.log(othername)
		var messageId = null
		let filter = {
			$or: [
				{ username1: othername, username2: username },
				{ username1: username, username2: othername }
			]
		}

		console.log("filter: ", filter)
		console.log("========================= GET_PROFILE_MESSAGEME_ID =========================")
		console.log("req.session.othername: ", req.session.othername);
		console.log(filter)
		console.log(othername, username)
		console.log("========================= GET_PROFILE_MESSAGEME_ID =========================")
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
	GET_PROFILE_MESSAGEME_ID: GET_PROFILE_MESSAGEME_ID
}

const globalConstants = require("../../constants/constants")
const dbf = require('../db/db-functions')
const { verifyLogin } = require("../../lib/toolkit")



let userData = {
	username: "marcuwynu23",
	firstname: "Mark Wayne",
	middlename: "Buncaras",
	lastname: "Menorca"
}

const GET_PROFILE = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		return res.render("profile/profile.html", {
			ctx: globalConstants.ctx,
			userData: userData,
			othername: null
		});
	})

}


const GET_PROFILE_ID = (req, res) => {

	verifyLogin(req, res, (accountId, username) => {
		let othername = req.params.username
		if (othername === "message") {
			othername = username
		}
		req.session.othername = othername
		return res.render("profile/profile.html", {
			ctx: globalConstants.ctx,
			userData: userData,
			othername: othername
		});
	})

}



const GET_PROFILE_MESSAGEME_ID = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {

		let othername = req.session.othername
		if (othername === "message") {
			othername = username
		}
		var messageId = null
		let filter = {
			$or: [{ username1: othername }, { username2: othername }]
		}
		dbf.getAllMessageDataBy(filter, (err, docs) => {
			messageId = new require("mongodb").ObjectId().toString()
			if (docs.length !== 0) {
				docs.forEach(data => {
					messageId = data.messageId.toString()
					if (data.username1 !== othername || data.username2 !== othername) {
						messageId = new require("mongodb").ObjectId().toString()
					}
				})
			}
			let redirectUrl = `${globalConstants.ctx.DOMAIN_NAME}/messages/${messageId}/?username=${othername}`
			return res.redirect(redirectUrl)
		})


	})
}



module.exports = {
	GET_PROFILE: GET_PROFILE,
	GET_PROFILE_ID: GET_PROFILE_ID,
	GET_PROFILE_MESSAGEME_ID: GET_PROFILE_MESSAGEME_ID
}

const globalConstants = require("../../constants/constants")
// const dbf = require('./db/db-functions')
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
			userData: userData
		});
	})

}





const GET_PROFILE_MESSAGEME = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		const id = new require("mongodb").ObjectId().toString()
		return res.redirect(globalConstants.ctx.DOMAIN_NAME + '/messages/' + id)
	})
}



module.exports = {
	GET_PROFILE: GET_PROFILE,
	GET_PROFILE_MESSAGEME: GET_PROFILE_MESSAGEME
}
const globalConstants = require("../../../constants/constants")
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")


let datenow = datetimenow()
const GET_NOTIFICATION = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		return res.render("notification/index.html", {
			ctx: globalConstants.ctx,
			accountId: accountId,
			username: username
		})
	})
}



module.exports = {
	GET_NOTIFICATION: GET_NOTIFICATION
}
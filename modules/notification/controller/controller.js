const globalConstants = require("../../../constants/constants")
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")


let datenow = datetimenow()
const POST_NOTIFICATION = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		return res.redirect(globalConstants.ctx)
	})
}

module.exports = {
	POST_NOTIFICATION: POST_NOTIFICATION
}
const globalConstants = require("../../../constants/constants")
const { verifyLogin } = require("../../../lib/toolkit")

const GET_DASHBOARD = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		console.log(accountId)
		return res.render("dashboard.html", {
			ctx: globalConstants.ctx,
			username: username,
			accountId: accountId
		})
	})

}

module.exports = {
	GET_DASHBOARD: GET_DASHBOARD
}
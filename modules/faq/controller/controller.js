
const globalConstants = require("../../../constants/constants");
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")

const GET_FAQ = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		res.render("faq/index.html", {
			ctx: globalConstants.ctx,
			accountId: accountId,
			username: username,
			othername: username
		})
	})

}


module.exports = {
	GET_FAQ: GET_FAQ
}
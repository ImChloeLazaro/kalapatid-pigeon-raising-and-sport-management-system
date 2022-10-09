
const model = require('../model/models')
const globalConstants = require("../../../constants/constants");
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")

const GET_HELP = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		res.render("help/index.html", {
			ctx: globalConstants.ctx,
			accountId: accountId,
			username: username,
			othername: username
		})
	})

}


module.exports = {
	GET_HELP: GET_HELP
}
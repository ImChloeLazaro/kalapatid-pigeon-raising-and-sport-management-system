const globalConstants = require("../../../constants/constants")
const { verifyLogin } = require("../../../lib/toolkit")


const REDIRECT = (req, res) => {
	return (req.session.isAuthenticated) ? res.redirect(globalConstants.ctx.DOMAIN_NAME + '/home') : res.redirect(globalConstants.ctx.DOMAIN_NAME + '/auth/login')
}

const GET_HOME = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		console.log(accountId)
		return res.render("index.html", {
			ctx: globalConstants.ctx,
			username: username,
			accountId: accountId
		})
	})

}

module.exports = {
	REDIRECT: REDIRECT,
	GET_HOME: GET_HOME
}
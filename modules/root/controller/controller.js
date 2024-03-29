const globalConstants = require("../../../constants/constants")
const { verifyLogin } = require("../../../lib/toolkit")


const REDIRECT = (req, res) => {
	return (req.session.isAuthenticated) ? res.redirect(globalConstants.ctx.DOMAIN_NAME + '/home') : res.redirect(globalConstants.ctx.DOMAIN_NAME + '/auth/login')
}

const GET_HOME = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/feeds")
	})

}

module.exports = {
	REDIRECT: REDIRECT,
	GET_HOME: GET_HOME
}
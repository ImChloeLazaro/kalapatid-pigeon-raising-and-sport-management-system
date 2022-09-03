const globalConstants = require("../../../constants/constants")
const { verifyLogin } = require("../../../lib/toolkit")

const SEARCH = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/search/result/?q=" + req.query.q)
	})

}

const SEARCH_RESULT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		console.log(req.query)
		return res.render('search/search-result.html', {})
	})

}

module.exports = {
	SEARCH: SEARCH,
	SEARCH_RESULT: SEARCH_RESULT
}
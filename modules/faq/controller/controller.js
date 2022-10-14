
const globalConstants = require("../../../constants/constants");
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")

const ObjectId = require("mongodb").ObjectId

const { getNotifications } = require("../../../database/notification-query")


const GET_FAQ = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let filter = { accountId: new ObjectId(accountId) };
		getNotifications(filter, (err, notifications) => {
			res.render("faq/index.html", {
				ctx: globalConstants.ctx,
				accountId: accountId,
				username: username,
				othername: username
			})
		})
	})
}


module.exports = {
	GET_FAQ: GET_FAQ
}
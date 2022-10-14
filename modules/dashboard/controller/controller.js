const globalConstants = require("../../../constants/constants")
const { verifyLogin } = require("../../../lib/toolkit")
const { getForcastWeather } = require("../../../lib/weather")

const ObjectId = require('mongodb').ObjectId
const { getNotifications } = require("../../../database/notification-query")

const GET_DASHBOARD = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let filter = { accountId: new ObjectId(accountId) };
		getNotifications(filter, (err, notifications) => {
			return res.render("dashboard/dashboard.html", {
				ctx: globalConstants.ctx,
				username: username,
				accountId: accountId,
				notifications: notifications,
			})
		})
	})
}

module.exports = {
	GET_DASHBOARD: GET_DASHBOARD
}
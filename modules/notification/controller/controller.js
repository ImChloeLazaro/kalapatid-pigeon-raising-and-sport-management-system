const globalConstants = require("../../../constants/constants")
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")

const ObjectId = require('mongodb').ObjectId

const { getNotifications, getAllNotifications } = require("../../../database/notification-query")



let datenow = datetimenow()
const GET_NOTIFICATION = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let filter = { accountId: new ObjectId(accountId) };
		getAllNotifications(filter, (err, allnotifications) => {
			getAllNotifications(filter, (err, notifications) => {
				return res.render("notification/index.html", {
					ctx: globalConstants.ctx,
					accountId: accountId,
					username: username,
					notifications: notifications,
					allnotifications: allnotifications
				})
			})
		})
	})
}



module.exports = {
	GET_NOTIFICATION: GET_NOTIFICATION
}
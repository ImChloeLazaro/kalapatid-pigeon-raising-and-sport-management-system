const globalConstants = require("../../constants/constants")
const { verifyLogin, datetimenow } = require("../../lib/toolkit")

let datenow = datetimenow()
let notifications = [
	{ _id: 1, datetime: datenow, content: "notification 1" },
	{ _id: 2, datetime: datenow, content: "notification 2" },
	{ _id: 3, datetime: datenow, content: "notification 3" },
	{ _id: 4, datetime: datenow, content: "notification 4" },
	{ _id: 5, datetime: datenow, content: "notification 5" },
	{ _id: 6, datetime: datenow, content: "notification 6" },
	{ _id: 7, datetime: datenow, content: "notification 7" },
	{ _id: 8, datetime: datenow, content: "notification 8" },
]

const GET_NOTIFICATION = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		return res.render("notification/index.html", {
			ctx: globalConstants.ctx,
			notifications: notifications
		})
	})
}

module.exports = {
	GET_NOTIFICATION: GET_NOTIFICATION
}
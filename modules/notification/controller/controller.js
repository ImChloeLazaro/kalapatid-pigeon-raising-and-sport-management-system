const globalConstants = require("../../../constants/constants")
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")


let datenow = datetimenow()
let notifications = [
	{ _id: 1, datetime: datenow, content: "notification 1", link: "link" },
	{ _id: 2, datetime: datenow, content: "notification 2", link: "link" },
	{ _id: 3, datetime: datenow, content: "notification 3", link: "link" },
	{ _id: 4, datetime: datenow, content: "notification 4", link: "link" },
	{ _id: 5, datetime: datenow, content: "notification 5", link: "link" },
	{ _id: 6, datetime: datenow, content: "notification 6", link: "link" },
	{ _id: 7, datetime: datenow, content: "notification 7", link: "link" },
	{ _id: 8, datetime: datenow, content: "notification 8", link: "link" },
]

const GET_NOTIFICATION = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		return res.render("notification/index.html", {
			ctx: globalConstants.ctx,
			username: username,
			notifications: notifications
		})
	})
}

module.exports = {
	GET_NOTIFICATION: GET_NOTIFICATION
}
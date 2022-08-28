const globalConstants = require("../../constants/constants")
const { verifyLogin } = require("../../lib/toolkit")

let events = [
	{ _id: 1, name: "event 1" },
	{ _id: 2, name: "event 2" },
	{ _id: 3, name: "event 3" },
	{ _id: 4, name: "event 4" },
	{ _id: 5, name: "event 5" },
	{ _id: 6, name: "event 6" },
	{ _id: 7, name: "event 7" },
	{ _id: 8, name: "event 8" },
]

const GET_EVENT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		return res.render("event/index.html", {
			ctx: globalConstants.ctx,
			events: events
		});
	})

}
const GET_EVENT_ID = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		console.log(req.query)
		return res.render("event/show-event.html", {
			ctx: globalConstants.ctx,
			events: events
		});
	})

}





const POST_CREATE_EVENT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {

		let eventName = req.body.eventName
		return res.render("event/create-event.html", {
			ctx: globalConstants.ctx,
			eventName: eventName
		})
	})
}
const POST_SAVE_EVENT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let data = req.body
		console.log(data)
		return res.redirect(globalConstants.ctx.DOMAIN_NAME + '/events')

	})
}


module.exports = {
	GET_EVENT: GET_EVENT,
	GET_EVENT_ID: GET_EVENT_ID,
	POST_CREATE_EVENT: POST_CREATE_EVENT,
	POST_SAVE_EVENT: POST_SAVE_EVENT,
};


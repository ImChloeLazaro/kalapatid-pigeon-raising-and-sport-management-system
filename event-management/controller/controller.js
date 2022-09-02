const { ObjectId } = require("mongodb")
const globalConstants = require("../../constants/constants")
const { verifyLogin } = require("../../lib/toolkit")
const dbf = require('../db/db-functions')
const model = require('../model/model')







const GET_EVENT = (req, res) => {
	function query(accountId, fn) {
		let accountIdObj = new ObjectId(accountId)
		let filter = { accountId: accountIdObj }
		dbf.getAllEventDataBy(filter, (err, docs) => {
			if (err) return
			let events = docs
			fn(events)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		query(accountId, (events) => {
			return res.render("event/index.html", {
				ctx: globalConstants.ctx,
				events: events
			})
		})
	})

}


const SHOW_EVENT_ID = (req, res) => {
	function query(accountId, eventId, fn) {
		let eventIdObj = new ObjectId(eventId)
		let accountIdObj = new ObjectId(accountId)
		let filter = {
			accountId: accountIdObj, _id: eventIdObj
		}
		dbf.getEventDataBy(filter, (err, docs) => {
			if (err) return
			let event = docs
			fn(event)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		query(accountId, req.params.id, (event) => {
			return res.render("event/show-event.html", {
				ctx: globalConstants.ctx,
				event: event
			})
		})
	})

}




const GET_CREATE_EVENT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		return res.render("event/create-event.html", {
			ctx: globalConstants.ctx
		})
	})
}



const POST_CREATE_EVENT = (req, res) => {
	function query(accountId, data, fn) {
		dbf.insertEventData(data, (err) => {
			fn(err)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let name = req.body.name
		let date = req.body.date
		let long = req.body.long
		let lat = req.body.lat
		let hourStart = req.body.hourStart
		let hourEnd = req.body.hourEnd
		let type = req.body.type
		let description = req.body.description
		let EventModel = model.Event(accountId, name, date, long, lat, hourStart, hourEnd, type, description)
		query(accountId, EventModel, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/events")
		})
	})
}



module.exports = {
	GET_EVENT: GET_EVENT,
	SHOW_EVENT_ID: SHOW_EVENT_ID,
	GET_CREATE_EVENT: GET_CREATE_EVENT,
	POST_CREATE_EVENT: POST_CREATE_EVENT
}

